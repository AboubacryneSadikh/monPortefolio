import 'dotenv/config'
import express    from 'express'
import cors       from 'cors'
import mongoose   from 'mongoose'
import projectRoutes from './routes/projectRoutes.js'

const PORT         = process.env.PORT         || 3001
const MONGO_URI    = process.env.MONGO_URI
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

/* ── Vérification variables obligatoires ── */
if (!MONGO_URI) {
  console.error('\n❌ MONGO_URI manquant dans le fichier .env')
  console.error('   Copiez .env.example → .env et renseignez votre URI MongoDB Atlas\n')
  process.exit(1)
}

const app = express()

/* ── Middlewares ── */
app.use(cors({
  origin:  FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json({ limit: '15mb' }))   // images base64 peuvent être volumineuses

/* ── Route de santé ── */
app.get('/', (_req, res) => {
  res.json({
    message: '🚀 API G2-AWS-P2026 opérationnelle',
    version: '1.0.0',
    db:      mongoose.connection.readyState === 1 ? 'connecté' : 'déconnecté',
  })
})

/* ── Routes API ── */
app.use('/api/projects', projectRoutes)

/* ── 404 global ── */
app.use((req, res) => {
  res.status(404).json({ error: `Route inconnue : ${req.method} ${req.url}` })
})

/* ── Gestionnaire d'erreurs global ── */
app.use((err, _req, res, _next) => {
  console.error('Erreur non gérée :', err)
  res.status(500).json({ error: 'Erreur interne du serveur' })
})

/* ── Connexion MongoDB Atlas puis démarrage ── */
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('\n╔══════════════════════════════════════════╗')
      console.log('║   🚀 G2-AWS-P2026 — Backend Express.js   ║')
      console.log('╚══════════════════════════════════════════╝')
      console.log(`\n  Serveur  → http://localhost:${PORT}`)
      console.log(`  MongoDB  → Connecté à Atlas ✅`)
      console.log(`  CORS     → ${FRONTEND_URL}\n`)
    })
  })
  .catch(err => {
    console.error('\n❌ Échec de connexion à MongoDB Atlas :')
    console.error('  ', err.message)
    console.error('\n  Vérifiez votre MONGO_URI dans le fichier .env')
    console.error('  Vérifiez que votre IP est autorisée dans MongoDB Atlas (Network Access)\n')
    process.exit(1)
  })
