import { useEffect, useState } from "react";
import { Button, Card, List, message, Tag } from "antd";
import {
  deactivateAPIKey,
  fetchAPIKeysByUserId,
  generateAPIKey,
} from "../services/apiKeyService";
import { useAuth } from "../context/AuthContext";

const APIKeyManager = () => {
  const [apiKeys, setAPIKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const userData = user?.data || null;

  const loadKeys = async () => {
    try {
      setLoading(true);

      if (!userData) {
        message.error("User Not Authenticated");
        return;
      }

      const result = await fetchAPIKeysByUserId(userData?.id);

      if (result.success) {
        setAPIKeys(result.data);
      }
    } catch (error) {
      console.error("Error loading API keys:", error);
      message.error("Failed to load API keys");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKeys();
  }, []);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      if (!user) {
        message.error("User not authenticated");
        return;
      }

      const result = await generateAPIKey(userData?.id);
      if (result.success) {
        message.success("API key generated");
        loadKeys();
      }
    } catch (error) {
      console.error("Error generating API key:", error);
      message.error("Failed to generate API key");
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (key) => {
    try {
      setLoading(true);
      const result = await deactivateAPIKey(key);
      if (result.success) {
        message.success("API key deactivated");
        loadKeys();
      }
    } catch (error) {
      console.error("Error deactivating API key:", error);
      message.error("Failed to deactivate API key");
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
        <h2>API Key Management</h2>
        <div>
          <Button style={{ marginRight: 10 }} onClick={handleGenerate}>
            Generate Key
          </Button>
        </div>
      </div>
      <div
        style={{
          fontWeight: 500,
          padding: "16px",
          backgroundColor: "#f9f9f9",
          border: "1px solid #e0e0e0",
          borderRadius: "6px",
          color: "#333",
          lineHeight: 1.6,
          marginBottom: "20px",
        }}
      >
        This dashboard is used to track API key usage. Users can generate new
        keys and deactivate existing ones. Only one active key is allowed per
        user. Generating a new key will automatically deactivate the currently
        active one. <br />
        <Tag color="blue">
          API keys are shown by their ID and not the actual API key
        </Tag>
        <Tag color="red">
          Without an active API key, access to the Countries Dashboard is
          restricted.
        </Tag>
      </div>

      <Card>
        <List
          dataSource={apiKeys}
          renderItem={(item) => (
            <List.Item
              actions={[
                item.isActive ? (
                  <Button danger onClick={() => handleDeactivate(item.apiKey)}>
                    Deactivate
                  </Button>
                ) : (
                  <Tag color="red">Deactivated</Tag>
                ),
              ]}
            >
              <List.Item.Meta
                title={item.id}
                description={`Created: ${item.createdAt} | Last Used: ${item.lastUsed} | Used: ${item.usageCount} times`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default APIKeyManager;
