import { Form, Input, Button, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const RegisterForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await register(values);

      if (res?.success) {
        message.success("Registered Successfully");
        navigate("/login");
      } else {
        message.error(res?.message);
      }
    } catch (err) {
      console.error("Registration error:", err);
      message.error("User Registration Failed");
    }
  };

  return (
    <Card
      title="Register"
      style={{ width: 300, margin: "auto", marginTop: 50 }}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
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
            Register
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" onClick={() => navigate("/login")}>
        Already have an account? Login here
      </Button>
    </Card>
  );
};

export default RegisterForm;
