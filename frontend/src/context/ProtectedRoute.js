import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { secureApiInstance } from "../api/apiInstance";
import { useAuth } from "./AuthContext";
import { Spin } from "antd";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await secureApiInstance.get("/users/authenticate");
        if (res?.data) {
          setUser(res.data);
        }

        if (res?.error) {
          setUser(null);
          navigate("/login");
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser]);

  if (loading) return <Spin />;
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
