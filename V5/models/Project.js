import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, 'Le titre est obligatoire'],
      trim:     true,
      maxlength: [120, 'Le titre ne peut pas dépasser 120 caractères'],
    },
    short: {
      type:     String,
      required: [true, 'Le résumé est obligatoire'],
      trim:     true,
      maxlength: [250, 'Le résumé ne peut pas dépasser 250 caractères'],
    },
    description: {
      type:     String,
      required: [true, 'La description est obligatoire'],
      trim:     true,
    },
    image: {
      type:    String,   // base64 ou URL
      default: '',
    },
    tags: {
      type:    [String],
      default: [],
    },
    type: {
      type:    String,
      enum:    ['Cloud', 'DevOps', 'Web', 'Mobile', 'Desktop', 'API', 'IA / Data'],
      default: 'Cloud',
    },
    github: {
      type:    String,
      default: '',
      trim:    true,
    },
    features: {
      type:    [String],
      default: [],
    },
  },
  {
    timestamps: true,   // createdAt + updatedAt automatiques
    versionKey: false,
  }
)

const Project = mongoose.model('Project', projectSchema)

export default Project
