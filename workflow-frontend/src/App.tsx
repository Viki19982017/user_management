import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Frame } from "@shopify/polaris";
import { useAuth } from "./state/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

type ChildrenElement = React.ReactElement;
function ProtectedRoute({ children }: { children: ChildrenElement }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  // TopBar is optional; simplify to avoid deprecated API usage

  return (
    <Frame>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Frame>
  );
}

export default App;
