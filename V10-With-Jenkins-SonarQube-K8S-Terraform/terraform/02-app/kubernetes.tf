# ─── Namespace ───────────────────────────────────────────────────────────────

resource "kubernetes_namespace" "portfolio" {
  metadata {
    name = var.k8s_namespace
  }
}

# ─── Secret MongoDB ───────────────────────────────────────────────────────────

resource "kubernetes_secret" "mongodb" {
  metadata {
    name      = "mongodb-secret"
    namespace = kubernetes_namespace.portfolio.metadata[0].name
  }

  # Les valeurs doivent être en base64 — Terraform encode automatiquement
  # les clés du bloc `data` (pas besoin de base64encode ici)
  data = {
    mongo-username = var.mongo_username
    mongo-password = var.mongo_password
  }

  type = "Opaque"
}

# ─── MongoDB StatefulSet ──────────────────────────────────────────────────────

resource "kubernetes_stateful_set" "mongodb" {
  metadata {
    name      = "mongodb"
    namespace = kubernetes_namespace.portfolio.metadata[0].name
  }

  spec {
    service_name = "mongodb-service"
    replicas     = 1

    selector {
      match_labels = { app = "mongodb" }
    }

    template {
      metadata {
        labels = { app = "mongodb" }
      }

      spec {
        container {
          name  = "mongodb"
          image = "mongo:7.0"

          port { container_port = 27017 }

          env {
            name = "MONGO_INITDB_ROOT_USERNAME"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.mongodb.metadata[0].name
                key  = "mongo-username"
              }
            }
          }

          env {
            name = "MONGO_INITDB_ROOT_PASSWORD"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.mongodb.metadata[0].name
                key  = "mongo-password"
              }
            }
          }

          env {
            name  = "MONGO_INITDB_DATABASE"
            value = "aboubacryne_portfolio"
          }

          volume_mount {
            name       = "mongo-data"
            mount_path = "/data/db"
          }

          readiness_probe {
            exec {
              command = ["mongosh", "--eval", "db.adminCommand('ping')"]
            }
            initial_delay_seconds = 15
            period_seconds        = 10
            timeout_seconds       = 5
            failure_threshold     = 6
          }
        }
      }
    }

    volume_claim_template {
      metadata { name = "mongo-data" }

      spec {
        access_modes       = ["ReadWriteOnce"]
        storage_class_name = "gp2"
        resources {
          requests = { storage = "10Gi" }
        }
      }
    }
  }
}

# ─── MongoDB Service (Headless) ───────────────────────────────────────────────

resource "kubernetes_service" "mongodb" {
  metadata {
    name      = "mongodb-service"
    namespace = kubernetes_namespace.portfolio.metadata[0].name
  }

  spec {
    selector   = { app = "mongodb" }
    cluster_ip = "None"
    port {
      port        = 27017
      target_port = 27017
    }
  }
}

# ─── Backend Deployment ───────────────────────────────────────────────────────

resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "backend"
    namespace = kubernetes_namespace.portfolio.metadata[0].name
  }

  spec {
    replicas = 1

    selector {
      match_labels = { app = "backend" }
    }

    template {
      metadata {
        labels = { app = "backend" }
      }

      spec {
        init_container {
          name    = "wait-for-mongodb"
          image   = "busybox:1.35"
          command = ["sh", "-c", "until nc -z mongodb-service 27017; do echo waiting; sleep 3; done"]
        }

        container {
          name  = "backend"
          image = "${var.dockerhub_username}/portfolio-backend:${var.backend_image_tag}"

          port { container_port = 5000 }

          env {
            name  = "PORT"
            value = "5000"
          }
          env {
            name  = "NODE_ENV"
            value = "production"
          }
          env {
            name  = "FRONTEND_URL"
            value = "http://frontend-service:80"
          }

          env {
            name = "MONGO_USERNAME"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.mongodb.metadata[0].name
                key  = "mongo-username"
              }
            }
          }

          env {
            name = "MONGO_PASSWORD"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.mongodb.metadata[0].name
                key  = "mongo-password"
              }
            }
          }

          env {
            name  = "MONGODB_URI"
            value = "mongodb://$(MONGO_USERNAME):$(MONGO_PASSWORD)@mongodb-service:27017/aboubacryne_portfolio?authSource=admin"
          }

          readiness_probe {
            http_get {
              path = "/api/projects"
              port = 5000
            }
            initial_delay_seconds = 20
            period_seconds        = 10
            failure_threshold     = 10
          }

          liveness_probe {
            http_get {
              path = "/api/projects"
              port = 5000
            }
            initial_delay_seconds = 40
            period_seconds        = 20
            failure_threshold     = 5
          }
        }
      }
    }
  }

  depends_on = [kubernetes_stateful_set.mongodb]
}

# ─── Backend Service ──────────────────────────────────────────────────────────

resource "kubernetes_service" "backend" {
  metadata {
    name      = "backend-service"
    namespace = kubernetes_namespace.portfolio.metadata[0].name
  }

  spec {
    selector = { app = "backend" }
    port {
      port        = 5000
      target_port = 5000
    }
    type = "ClusterIP"
  }
}

# ─── Frontend Deployment ──────────────────────────────────────────────────────

resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "frontend"
    namespace = kubernetes_namespace.portfolio.metadata[0].name
  }

  spec {
    replicas = 2

    selector {
      match_labels = { app = "frontend" }
    }

    template {
      metadata {
        labels = { app = "frontend" }
      }

      spec {
        container {
          name  = "frontend"
          image = "${var.dockerhub_username}/portfolio-frontend:${var.frontend_image_tag}"

          port { container_port = 80 }

          readiness_probe {
            http_get {
              path = "/"
              port = 80
            }
            initial_delay_seconds = 10
            period_seconds        = 10
            failure_threshold     = 5
          }
        }
      }
    }
  }
}

# ─── Frontend Service (LoadBalancer AWS) ──────────────────────────────────────

resource "kubernetes_service" "frontend" {
  metadata {
    name      = "frontend-service"
    namespace = kubernetes_namespace.portfolio.metadata[0].name
    annotations = {
      "service.beta.kubernetes.io/aws-load-balancer-type" = "classic"
    }
  }

  spec {
    selector = { app = "frontend" }
    port {
      port        = 80
      target_port = 80
    }
    type = "LoadBalancer"
  }
}
