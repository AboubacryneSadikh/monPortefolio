import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import About from './pages/About';
import FormSuccess from './pages/FormSuccess';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projets" element={<Projects />} />
              <Route path="/projets/ajouter" element={<AddProject />} />
              <Route path="/projets/:id" element={<ProjectDetail />} />
              <Route path="/projets/:id/modifier" element={<EditProject />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/merci" element={<FormSuccess />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}
