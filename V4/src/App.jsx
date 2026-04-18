import { Routes, Route } from 'react-router-dom'
import Navbar      from './components/Navbar'
import Home        from './pages/Home'
import Projects    from './pages/Projects'
import AddProject  from './pages/AddProject'
import EditProject from './pages/EditProject'
import ProjectDetail from './pages/ProjectDetail'
import FormSuccess from './pages/FormSuccess'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"                       element={<Home />} />
        <Route path="/projets"                element={<Projects />} />
        <Route path="/projets/ajouter"        element={<AddProject />} />
        <Route path="/projets/:id/modifier"   element={<EditProject />} />
        <Route path="/projets/:id"            element={<ProjectDetail />} />
        <Route path="/merci"                  element={<FormSuccess />} />
      </Routes>
    </>
  )
}
