import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Select, Button, message } from "antd";
import { fetchCountries } from "../services/countryService";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const { user } = useAuth();

  const userData = user?.data || null;

  useEffect(() => {
    const fetchCountryData = async () => {
      setLoading(true);

      let data = [];
      try {
        if (filter === "all") {
          data = await fetchCountries("all", userData?.id);
        } else if (filter === "independent") {
          data = await fetchCountries("independent", userData?.id);
        }

        setCountries(data?.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        message.error("Failed to load countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [filter]);

  const handleLogout = async () => {
    try {
      await logout();
      message.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      message.error("Logout failed");
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Rest Countries</h2>
        <div>
          <Select
            defaultValue="all"
            style={{ width: 180, marginRight: 10 }}
            onChange={(value) => setFilter(value)}
            options={[
              { value: "all", label: "All Countries" },
              { value: "independent", label: "Independent Countries" },
            ]}
          />
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      {loading && <Spin />}

      {!loading && countries?.length === 0 && <div>No countries available</div>}

      {!loading && countries && (
        <Row gutter={[16, 16]}>
          {countries.map((country, index) => (
            <Col xs={24} sm={12} md={8} lg={4} key={index}>
              <Card
                hoverable
                style={{ height: 340, fontSize: "0.85rem" }}
                cover={
                  <img
                    alt={country?.name}
                    src={country?.flag}
                    style={{ height: 120, objectFit: "cover", padding: 8 }}
                  />
                }
              >
                <Card.Meta title={country?.name} />
                <p>
                  <strong>Capital:</strong> {country?.capital}
                </p>
                <p>
                  <strong>Languages:</strong>{" "}
                  {Object.values(country?.languages || {}).join(", ")}
                </p>
                <p>
                  <strong>Currency:</strong>{" "}
                  {Object.values(country?.currency || {})[0]?.name} (
                  {Object.values(country?.currency || {})[0]?.symbol})
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
export default Dashboard;
