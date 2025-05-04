import React from "react";
import { Layout, Menu, theme } from "antd";
import { HomeOutlined, DashboardOutlined } from "@ant-design/icons";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import RegisterForm from "./components/RegisterForm.js";
import LoginForm from "./components/LoginFom.js";
import ProtectedRoute from "./context/ProtectedRoute.js";
import { useAuth } from "./context/AuthContext.js";
import Dashboard from "./screens/Dashboard.js";
import APIKeyManager from "./screens/APIKeyManager.js";

const { Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuth();

  const items = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Admin",
    },
    {
      key: "2",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          onClick={({ key }) => {
            if (key === "1") navigate("/admin");
            if (key === "2") navigate("/dashboard");
          }}
        />

      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/login" element={user.user? navigate("/dashboard") : <LoginForm />} />
            <Route
              path="/"
              element={
                user?.user ? (
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                ) : (
                  <LoginForm />
                )
              }
            />
            <Route path="/register" element={<RegisterForm />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <APIKeyManager />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Developed by Janidu Rathnayaka (20210450)
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
