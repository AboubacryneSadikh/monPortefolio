const client = require('prom-client');

const register = new client.Registry();

// Métriques Node.js automatiques (CPU, mémoire, event loop...)
client.collectDefaultMetrics({ register });

// Compteur de requêtes HTTP
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requêtes HTTP',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

// Durée des requêtes
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Durée des requêtes HTTP en secondes',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  registers: [register],
});

// Connexions MongoDB actives
const mongoConnectionsGauge = new client.Gauge({
  name: 'mongodb_connections_active',
  help: 'Nombre de connexions MongoDB actives',
  registers: [register],
});

module.exports = {
  register,
  httpRequestsTotal,
  httpRequestDuration,
  mongoConnectionsGauge,
};