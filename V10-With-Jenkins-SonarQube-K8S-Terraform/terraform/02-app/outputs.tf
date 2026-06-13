output "frontend_url" {
  description = "URL publique du frontend (AWS LoadBalancer)"
  value       = "http://${kubernetes_service.frontend.status[0].load_balancer[0].ingress[0].hostname}"
}

output "namespace" {
  description = "Namespace Kubernetes de l'application"
  value       = kubernetes_namespace.portfolio.metadata[0].name
}

output "backend_service" {
  description = "Service backend (interne au cluster)"
  value       = "backend-service:5000"
}
