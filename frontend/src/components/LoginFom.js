import { Form, Input, Button, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await login(values);

      if (res?.success) {
        message.success("Login Successful");
        navigate("/profile");
      } else {
        message.error(res?.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      message.error("User Login Failed");
    }
  };

  return (
    <Card title="Login" style={{ width: 300, margin: "auto", marginTop: 50 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={() => navigate("/register")}>
        Don't have an account? Register here
      </Button>
    </Card>
  );
};

export default LoginForm;
