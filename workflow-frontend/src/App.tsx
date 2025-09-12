import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Frame, TopBar } from "@shopify/polaris";
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
  const { user, logout } = useAuth();
  const topBarMarkup = (
    <TopBar
      userMenu={
        {
          name: user?.email || "Guest",
          actions: [{ items: [{ content: "Logout", onAction: logout }] }],
        } as any
      }
    />
  );

  return (
    <Frame topBar={topBarMarkup}>
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
