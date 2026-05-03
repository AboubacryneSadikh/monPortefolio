/**
 * seed.js — Initialisation de la base de données MongoDB Atlas
 * Lance avec : npm run seed
 * ⚠️  Ce script EFFACE et RECRÉE tous les projets.
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import Project  from './models/Project.js'

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  console.error('❌ MONGO_URI manquant dans .env')
  process.exit(1)
}

/* ── Données initiales ── */
const SEED_DATA = [
  {
    title:       'Infrastructure Cloud AWS — Déploiement multi-région',
    short:       'Conception et déploiement d\'une infrastructure hautement disponible sur AWS avec EC2, S3, RDS et CloudFront.',
    description: 'Mise en place d\'une infrastructure cloud complète sur AWS pour héberger une application web à haute disponibilité. Le projet inclut la configuration d\'instances EC2 en auto-scaling, un load balancer (ALB), une base de données RDS en mode Multi-AZ, un bucket S3 pour les assets statiques et une distribution CloudFront pour le CDN mondial.',
    image:       '',
    tags:        ['AWS', 'EC2', 'S3', 'RDS', 'CloudFront', 'Terraform'],
    type:        'Cloud',
    github:      '',
    features: [
      'Auto-scaling des instances EC2 selon la charge',
      'Load Balancer (ALB) pour la haute disponibilité',
      'Base de données RDS MySQL en mode Multi-AZ',
      'CDN CloudFront pour la distribution mondiale des assets',
      'Infrastructure as Code avec Terraform',
    ],
  },
  {
    title:       'Pipeline CI/CD avec GitHub Actions & AWS CodeDeploy',
    short:       'Automatisation du déploiement continu d\'une application Node.js vers AWS EC2 via GitHub Actions et CodeDeploy.',
    description: 'Mise en place d\'un pipeline CI/CD complet pour automatiser les tests, le build et le déploiement d\'une application Node.js/Express. Le pipeline intègre les tests unitaires avec Jest, la construction de l\'image Docker, la publication sur Amazon ECR et le déploiement automatique sur EC2 via AWS CodeDeploy avec stratégie Blue/Green.',
    image:       '',
    tags:        ['CI/CD', 'GitHub Actions', 'AWS CodeDeploy', 'Docker', 'Node.js'],
    type:        'DevOps',
    github:      '',
    features: [
      'Tests automatisés à chaque push avec Jest',
      'Build et publication d\'image Docker sur Amazon ECR',
      'Déploiement automatique Blue/Green via CodeDeploy',
      'Notifications Slack sur succès ou échec du pipeline',
      'Rollback automatique en cas d\'erreur de déploiement',
    ],
  },
  {
    title:       'Serverless API avec AWS Lambda & API Gateway',
    short:       'Développement d\'une API REST serverless avec AWS Lambda, API Gateway et DynamoDB pour la gestion d\'événements.',
    description: 'Conception et développement d\'une API REST entièrement serverless pour la gestion d\'événements académiques. L\'architecture repose sur AWS Lambda pour la logique métier, API Gateway pour l\'exposition des endpoints, DynamoDB comme base de données NoSQL et S3 pour le stockage des pièces jointes.',
    image:       '',
    tags:        ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'Serverless'],
    type:        'Cloud',
    github:      '',
    features: [
      'Architecture serverless — zéro serveur à gérer',
      'API Gateway avec authentification via Cognito',
      'Base de données DynamoDB avec index secondaires',
      'Stockage des fichiers dans S3 avec URLs présignées',
      'Monitoring via CloudWatch Logs et AWS X-Ray',
    ],
  },
  {
    title:       'Conteneurisation Docker & orchestration Kubernetes sur EKS',
    short:       'Conteneurisation d\'une application microservices et déploiement sur un cluster Kubernetes (EKS) sur AWS.',
    description: 'Projet de conteneurisation d\'une application composée de 4 microservices (authentification, projets, notifications, API Gateway) avec Docker Compose pour le développement local et Kubernetes (Amazon EKS) pour la production. Inclut la gestion des secrets avec AWS Secrets Manager et la supervision avec Prometheus et Grafana.',
    image:       '',
    tags:        ['Docker', 'Kubernetes', 'Amazon EKS', 'Microservices', 'Prometheus', 'Grafana'],
    type:        'DevOps',
    github:      '',
    features: [
      '4 microservices indépendants conteneurisés avec Docker',
      'Docker Compose pour l\'environnement de développement local',
      'Cluster Amazon EKS avec auto-scaling des pods (HPA)',
      'Gestion des secrets avec AWS Secrets Manager',
      'Tableaux de bord Grafana pour la supervision en temps réel',
    ],
  },
]

/* ── Exécution du seed ── */
async function seed() {
  try {
    console.log('\n🌱 Connexion à MongoDB Atlas…')
    await mongoose.connect(MONGO_URI)
    console.log('   ✅ Connecté\n')

    console.log('🗑️  Suppression des projets existants…')
    const deleted = await Project.deleteMany({})
    console.log(`   ✅ ${deleted.deletedCount} projet(s) supprimé(s)\n`)

    console.log('📦 Insertion des projets initiaux…')
    const inserted = await Project.insertMany(SEED_DATA)
    console.log(`   ✅ ${inserted.length} projet(s) inséré(s)\n`)

    inserted.forEach((p, i) => {
      console.log(`   [${i + 1}] ${p.title}`)
      console.log(`       ID : ${p._id}`)
    })

    console.log('\n✨ Base de données initialisée avec succès !\n')
  } catch (err) {
    console.error('\n❌ Erreur lors du seed :', err.message)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Connexion MongoDB fermée\n')
    process.exit(0)
  }
}

seed()
