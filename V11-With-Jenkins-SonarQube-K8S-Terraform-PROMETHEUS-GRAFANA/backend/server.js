const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

// 🆕 Import des métriques Prometheus
const { register, httpRequestsTotal, httpRequestDuration, mongoConnectionsGauge } = require('./metrics');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 🆕 Middleware de métriques HTTP (avant les routes)
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    const labels = {
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    };
    httpRequestsTotal.inc(labels);
    end(labels);
  });
  next();
});

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aboubacryne_portfolio')
  .then(() => {
    console.log('MongoDB connecté');
    mongoConnectionsGauge.set(1); // 🆕 Connexion MongoDB active
  })
  .catch(err => {
    console.error('erreur MongoDB :', err);
    mongoConnectionsGauge.set(0); // 🆕 Connexion MongoDB échouée
  });

// 🆕 Endpoint /metrics pour Prometheus (avant les autres routes)
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Route santé
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Aboubacryne Portfolio opérationnelle', version: '1.0.0' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur interne', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

module.exports = app;