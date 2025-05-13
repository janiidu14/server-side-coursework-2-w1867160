import React from "react";
import { Layout, Menu, theme } from "antd";
import { HomeOutlined, DashboardOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm.js";
import LoginForm from "./components/LoginFom.js";
import ProtectedRoute from "./context/ProtectedRoute.js";
import { useAuth } from "./context/AuthContext.js";
import Dashboard from "./screens/Dashboard.js";
import APIKeyManager from "./screens/APIKeyManager.js";
import BlogPosts from "./screens/BlogPosts.js";
import EditBlog from "./components/EditBlog.js";
import CreateBlog from "./components/CreateBlog.js";
import ProfilePage from "./screens/ProfilePage.js";
import FollowFeed from "./screens/FollowFeed.js";

const { Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuth();
  console.log(user)

  const items = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Blogs",
    },
    {
      key: "2",
      icon: <DashboardOutlined />,
      label: "Admin",
    },
    {
      key: "3",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: "Profile",
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          onClick={({ key }) => {
            if (key === "1") navigate("/blogs");
            if (key === "2") navigate("/admin");
            if (key === "3") navigate("/dashboard");
            if (key === "4") navigate("/profile");
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
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/blogs" element={<BlogPosts />} />
          <Route path="/login" element={user.user ? <Navigate to="/dashboard" /> : <LoginForm />} />
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
             <Route
              path="/create"
              element={
                user?.user ? (
                  <ProtectedRoute>
                    <CreateBlog />
                  </ProtectedRoute>
                ) : (
                  <LoginForm />
                )
              }
            />
            <Route
              path="/profile"
              element={
                user?.user ? (
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                ) : (
                  <LoginForm />
                )
              }
            />
            <Route path="/feed" element={<FollowFeed />} />

            <Route path="/blogs/:id" element={<EditBlog />} />
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
