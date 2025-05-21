import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Spin,
  Select,
  Button,
  message,
  Typography,
} from "antd";
import {
  fetchCountries,
  fetchCountryDetailsByName,
} from "../services/countryService";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const { Option } = Select;
const { Title, Paragraph } = Typography;

const Dashboard = () => {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

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

  const fetchCountryDetails = async (name) => {
    try {
      setLoading(true);
      const res = await fetchCountryDetailsByName(name, userData?.id);
      setSelected(res?.data[0]);
    } catch {
      console.error("Failed to fetch country details");
    } finally {
      setLoading(false);
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
        <h2>Countries</h2>
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
          {countries && (
            <Select
              showSearch
              placeholder="Select a country"
              style={{ width: 300, marginBottom: 24 }}
              optionFilterProp="children"
              onChange={fetchCountryDetails}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {countries.map((c) => (
                <Option key={uuidv4()} value={c.name}>
                  {c.name}
                </Option>
              ))}
            </Select>
          )}
        </div>
      </div>
      {loading && <Spin />}

      {!loading && countries?.length === 0 && <div>No countries available</div>}

      {!loading && selected && (
        <Card
          title={selected.name}
          style={{ maxWidth: 500, justifySelf: "center" }}
          cover={
            <img
              alt="flag"
              src={selected.flag}
              style={{ height: 240, objectFit: "cover" }}
            />
          }
        >
          <Paragraph>
            <strong>Capital:</strong> {selected.capital.join(", ")}
          </Paragraph>
          <Paragraph>
            <strong>Currency:</strong>{" "}
            {Object.entries(selected.currency)
              .map(([code, info]) => `${info.name} (${code})`)
              .join(", ")}
          </Paragraph>
          <Paragraph>
            <strong>Languages:</strong>{" "}
            {Object.values(selected.languages).join(", ")}
          </Paragraph>
        </Card>
      )}

      {!loading && !selected && countries && (
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
