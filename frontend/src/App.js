import { Button, Layout, Menu, message, theme } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import DisplayUsers from "./screens/DisplayUsers.js";
import { logout } from "./services/authService.js";
import HomePage from "./screens/HomePage.js";

const { Content, Footer, Header } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const { user, setUser } = useAuth();
  const userData = user?.data || null;

  const handleLogout = async () => {
    try {
      await logout();
      message.success("Logged out successfully");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      message.error("Logout failed");
    }
  };

  const items = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "2",
      icon: <HomeOutlined />,
      label: "Blogs",
    },
    {
      key: "3",
      icon: <DashboardOutlined />,
      label: "Admin",
    },
    {
      key: "4",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "5",
      icon: <UserOutlined />,
      label: "Profile",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", justifyContent: "space-between" }}>
        <Menu
          style={{ width: "-webkit-fill-available" }}
          theme="dark"
          mode="horizontal"
          items={items}
          onClick={({ key }) => {
            if (key === "1") navigate("/");
            if (key === "2") navigate("/blogs");
            if (key === "3") navigate("/admin");
            if (key === "4") navigate("/dashboard");
            if (key === "5") navigate("/profile");
          }}
        />
        <Button
          type="primary"
          style={{ marginTop: "15px" }}
          onClick={() => {
            if (userData) {
              handleLogout();
            } else {
              navigate("/login");
            }
          }}
        >
          {userData ? "Logout" : "Login"}
        </Button>
      </Header>

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
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/blogs" element={<BlogPosts />} />
            <Route
              path="/login"
              element={userData ? <Navigate to="/blogs" /> : <LoginForm />}
            />
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
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <DisplayUsers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/blogs/:id"
              element={
                <ProtectedRoute>
                  <EditBlog />
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
