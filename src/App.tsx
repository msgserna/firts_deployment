import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "../src/pages/LoginPage"
import SignUpPage from "../src/pages/SignUpPage"
import Dashboard from "./pages/Dashboard"
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* si quieres, añade más rutas aquí */}
    </Routes>
  )
}

export default App