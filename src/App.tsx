import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
