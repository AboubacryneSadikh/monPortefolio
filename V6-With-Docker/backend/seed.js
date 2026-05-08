const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

const projects = [
  {
    title: 'CloudTasker — Gestion de tâches',
    short: 'Application SaaS de gestion de tâches déployée sur AWS avec CI/CD automatisé',
    description: 'Plateforme de gestion de projets et tâches. Interface React moderne avec notifications en temps réel via WebSockets, backend Node.js containerisé sur AWS ECS, et pipeline CI/CD complet via GitHub Actions.',
    tags: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS ECS', 'WebSocket'],
    type: 'Cloud',
    status: 'Terminé',
    awsServices: ['ECS', 'ECR', 'RDS', 'S3', 'CloudFront', 'Route 53'],
    features: [
      'Authentification JWT avec refresh tokens',
      'Tableaux Kanban en temps réel (WebSocket)',
      'Notifications push et email',
      'Pipeline CI/CD GitHub Actions → AWS ECS',
      'Monitoring via CloudWatch',
      'Multi-workspace avec gestion des rôles'
    ],
    github: 'https://github.com/aboubacryne/cloudtasker'
  },
  {
    title: 'PrésenCheck — Système de gestion de présence',
    short: 'Application mobile + web de pointage avec géolocalisation et tableau de bord analytique',
    description: 'Solution complète de gestion de présence pour établissements scolaires et entreprises. Application mobile Flutter avec scan QR code, backend Spring Boot déployé sur AWS EC2, et dashboard analytique React avec exports PDF/Excel.',
    tags: ['Flutter', 'Spring Boot', 'MySQL', 'AWS EC2', 'React', 'Docker'],
    type: 'Mobile',
    status: 'Terminé',
    awsServices: ['EC2', 'RDS MySQL', 'S3', 'SES'],
    features: [
      'Scan QR code pour pointage instantané',
      'Géolocalisation et validation de zone',
      'Dashboard analytique temps réel',
      'Export rapports PDF et Excel',
      'Notifications SMS/email automatiques',
      'Application mobile Flutter (iOS + Android)'
    ],
    github: 'https://github.com/aboubacryne/presencheck'
  },
  {
    title: 'MarketPlace API — Plateforme e-commerce',
    short: 'API REST modulaire pour marketplace multi-vendeurs avec paiement intégré',
    description: 'Architecture microservices pour une marketplace multi-vendeurs. API REST Node.js avec authentification OAuth2, gestion des paiements via Stripe, stockage des médias sur S3, et moteur de recherche Elasticsearch pour les produits.',
    tags: ['Node.js', 'Express', 'MongoDB', 'Stripe', 'AWS S3', 'Elasticsearch'],
    type: 'API',
    status: 'En cours',
    awsServices: ['Lambda', 'API Gateway', 'S3', 'SQS', 'SNS', 'DynamoDB'],
    features: [
      'Architecture microservices serverless (AWS Lambda)',
      'Paiement Stripe avec webhooks',
      'Recherche full-text Elasticsearch',
      'Stockage médias AWS S3 + CDN CloudFront',
      'Queue de messages SQS pour commandes',
      'Documentation Swagger auto-générée'
    ],
    github: 'https://github.com/aboubacryne/marketplace-api'
  },
  {
    title: 'SkyInfra — Dashboard Infrastructure AWS',
    short: 'Outil de monitoring et visualisation des ressources AWS en temps réel',
    description: 'Tableau de bord de supervision d\'infrastructure cloud AWS. Intégration avec l\'API AWS pour afficher en temps réel les métriques EC2, RDS, Lambda et S3. Alertes configurables et rapports de coûts automatisés.',
    tags: ['React', 'Node.js', 'AWS SDK', 'Chart.js', 'Terraform', 'MongoDB'],
    type: 'DevOps',
    status: 'En cours',
    awsServices: ['CloudWatch', 'Cost Explorer', 'EC2', 'RDS', 'Lambda', 'IAM'],
    features: [
      'Vue unifiée de toutes les ressources AWS',
      'Graphiques métriques CPU, RAM, réseau',
      'Alertes personnalisables par seuil',
      'Rapports de coûts et recommandations',
      'Gestion Infrastructure as Code (Terraform)',
      'Multi-compte AWS avec rôles IAM'
    ],
    github: 'https://github.com/aboubacryne/skyinfra'
  },
  {
    title: 'EduConnect — Plateforme e-learning',
    short: 'Plateforme d\'apprentissage en ligne avec vidéos, quiz et suivi de progression',
    description: 'Plateforme e-learning complète pour formations professionnelles. Streaming vidéo via AWS MediaConvert et CloudFront, quiz interactifs avec correction automatique, certificats générés automatiquement, et système de recommandations IA basé sur le profil apprenant.',
    tags: ['React', 'Node.js', 'MongoDB', 'AWS MediaConvert', 'AWS CloudFront', 'Python'],
    type: 'Web',
    status: 'En cours',
    awsServices: ['MediaConvert', 'CloudFront', 'S3', 'Cognito', 'SageMaker'],
    features: [
      'Streaming vidéo adaptatif (HLS)',
      'Quiz interactifs avec feedback immédiat',
      'Génération automatique de certificats PDF',
      'Recommandations de cours par IA (SageMaker)',
      'Authentification AWS Cognito',
      'Tableau de bord progression apprenant'
    ],
    github: 'https://github.com/aboubacryne/educonnect'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aboubacryne_portfolio');
    console.log(' MongoDB connecté');

    await Project.deleteMany({});
    console.log('Collection projets vidée');

    await Project.insertMany(projects);
    console.log(`${projects.length} projets insérés`);

    console.log('Seed terminé avec succès !');
    process.exit(0);
  } catch (err) {
    console.error('Erreur de seed :', err);
    process.exit(1);
  }
}

seed();
