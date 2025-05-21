import { Typography, Row, Col, Button, Card } from "antd";
import {
  GlobalOutlined,
  FlagOutlined,
  TeamOutlined,
  HeartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <FlagOutlined style={{ fontSize: 32, color: "#1890ff" }} />,
    title: "Rich Country Insights",
    desc: "Every blog post is enhanced with national flags, currencies, and capital cities.",
  },
  {
    icon: <GlobalOutlined style={{ fontSize: 32, color: "#52c41a" }} />,
    title: "Personal Travel Chronicles",
    desc: "Share unique experiences while the platform adds real-world context.",
  },
  {
    icon: <TeamOutlined style={{ fontSize: 32, color: "#faad14" }} />,
    title: "Global Community",
    desc: "Connect with fellow travelers through a built-in following system.",
  },
  {
    icon: <HeartOutlined style={{ fontSize: 32, color: "#eb2f96" }} />,
    title: "Interactive Experience",
    desc: "Like, comment, and personalize your feed with the content you enjoy.",
  },
  {
    icon: <SearchOutlined style={{ fontSize: 32, color: "#722ed1" }} />,
    title: "Smart Search",
    desc: "Find blogs by country, author, or trending topics quickly and easily.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ backgroundColor: "#fefefe" }}>
        <Row justify="center">
          <Col xs={24} md={20} lg={24} style={{ textAlign: "center" }}>
            <Card
              style={{
                background: "#fafafa",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
              }}
            >
              <Title level={2} style={{ textAlign: "center" }}>
                🌍 Welcome to{" "}
                <span style={{ color: "#1890ff" }}>TravelTales</span>
              </Title>
              <Paragraph style={{ fontSize: "16px" }}>
                A vibrant community-driven platform where wanderlust meets
                storytelling. Share your travel stories and connect with fellow
                explorers around the world all enhanced with live country
                insights.
              </Paragraph>

              <Paragraph style={{ fontSize: "16px" }}>
                TravelTales transforms traditional blogging by enriching your
                stories with real country data from national flags to currencies
                and capital cities. Whether it’s the streets of Tokyo or the
                beaches of Bali, every blog captures more than memories.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                style={{ width: 180, marginTop: 24 }}
                onClick={() => navigate("/blogs")}
              >
                Start Exploring
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      <div style={{ backgroundColor: "#fafafa", padding: "60px 80px" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
          Features That Set Us Apart
        </Title>
        <Row gutter={[24, 24]} justify="center">
          {features.map((feature, idx) => (
            <Col xs={24} sm={12} md={8} lg={6} key={idx}>
              <Card
                hoverable
                bordered={false}
                style={{ textAlign: "center", minHeight: 220 }}
              >
                {feature.icon}
                <Title level={4} style={{ marginTop: 12 }}>
                  {feature.title}
                </Title>
                <Paragraph>{feature.desc}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
