import { Router } from 'express'
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  patchProject,
  deleteProject,
} from '../controllers/projectController.js'

const router = Router()

/* Collection */
router.get('/',    getAllProjects)   // GET    /api/projects
router.post('/',   createProject)   // POST   /api/projects

/* Document unique */
router.get('/:id',    getProjectById) // GET    /api/projects/:id
router.put('/:id',    updateProject)  // PUT    /api/projects/:id
router.patch('/:id',  patchProject)   // PATCH  /api/projects/:id
router.delete('/:id', deleteProject)  // DELETE /api/projects/:id

export default router
