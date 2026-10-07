import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AIInterview from "./pages/AIInterview";

import { useAuth } from "./context/AuthContext";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import CodingPractice from "./pages/CodingPractice";
import Aptitude from "./pages/Aptitude";
import LearningRoadmap from "./pages/LearningRoadmap";
import ProgressTracker from "./pages/ProgressTracker";

import TestBackend from "./TestBackend";


function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />

       <Route path="/test-backend" element={<TestBackend />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/ai-interview"
  element={
    <ProtectedRoute>
      <AIInterview />
    </ProtectedRoute>
  }

  
/>

<Route
  path="/resume-analyzer"
  element={
    <ProtectedRoute>
      <ResumeAnalyzer />
    </ProtectedRoute>
  }
/>

<Route
  path="/coding-practice"
  element={
    <ProtectedRoute>
      <CodingPractice />
    </ProtectedRoute>
  }
/>

<Route
  path="/aptitude"
  element={
  <ProtectedRoute>
    <Aptitude />
  </ProtectedRoute>
   }
/>

<Route
  path="/learning-roadmap"
  element={
    <ProtectedRoute>
      <LearningRoadmap />
    </ProtectedRoute>
  }
/>

<Route
  path="/progress-tracker"
  element={
    <ProtectedRoute>
      <ProgressTracker />
    </ProtectedRoute>
  }
/>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}



export default App;