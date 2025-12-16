import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Services from './pages/Services';
import Dashboard from "./pages/Dashboard";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import Skill from "./pages/Skill";
import ChangePassword from "./pages/ChangePassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>

        <Route 
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }/>

        <Route 
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }/>

        <Route 
          path="/skills"
          element={
            <ProtectedRoute>
              <Skill />
            </ProtectedRoute>
          }/>

        <Route 
          path="/experience"
          element={
            <ProtectedRoute>
              <Experience />
            </ProtectedRoute>
          }/>

        <Route 
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }/>

        <Route 
          path="/testimonials"
          element={
            <ProtectedRoute>
              <Testimonials />
            </ProtectedRoute>
          }/>

        <Route 
          path="/blog"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }/>

        <Route 
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }/>

      <Route 
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}