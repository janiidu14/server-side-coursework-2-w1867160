import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Space,
  message,
  Input,
  Row,
  Col,
  Select,
  Tooltip,
  Tag,
} from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { fetchBlogs } from "../services/blogService";
import { useAuth } from "../context/AuthContext";
import {
  createReaction,
  fetchReactionsToAllBlogs,
  fetchReactionsToAllBlogsPublic,
} from "../services/reactionService";
const { Option } = Select;

const { Paragraph } = Typography;

const BlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterType, setFilterType] = useState("country");
  const [filterText, setFilterText] = useState("");

  const { user } = useAuth();

  const userData = user?.data || null;

  const navigate = useNavigate();

  const handleFetchBlogs = async () => {
    try {
      const blogsRes = await fetchBlogs();
      let reactionsRes;
      if (userData) {
        reactionsRes = await fetchReactionsToAllBlogs();
      } else {
        reactionsRes = await fetchReactionsToAllBlogsPublic();
      }

      const enriched = blogsRes.data.map((blog) => {
        const r = reactionsRes.data.find((x) => x.blogId === blog.id) || {};
        console.log("r", r);
        return {
          ...blog,
          likes: r.likes || 0,
          dislikes: r.dislikes || 0,
          myReaction: r.myReaction || null,
        };
      });

      setBlogs(enriched);
      setFiltered(enriched);
    } catch {
      message.error("Failed to fetch blogs");
    }
  };

  const handleEdit = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  const handleDelete = async (id) => {
    try {
      const updated = blogs.filter((b) => b.id !== id);
      setBlogs(updated);
      setFiltered(updated);
      message.success("Deleted");
    } catch {
      message.error("Delete failed");
    }
  };

  const handleSearch = () => {
    const lower = filterText.toLowerCase();
    const result = blogs.filter((b) => {
      if (filterType === "country")
        return b.country?.toLowerCase().includes(lower);
      if (filterType === "username")
        return b.author?.toLowerCase().includes(lower);
      return true;
    });
    setFiltered(result);
  };

  const clearFilters = () => {
    setFiltered(blogs);
    setFilterText("");
    setFilterType("country");
  };

  const countReactions = (blog, type) => blog?.[type] || 0;
  const userReaction = (blog) => blog?.myReaction;

  const toggleReaction = async (blogId, type) => {
    try {
      await createReaction({ blogId, type });
      const reactionsRes = await fetchReactionsToAllBlogs();

      const updated = blogs.map((b) => {
        const r = reactionsRes.data.find((x) => x.blogId === b.id) || {};
        return {
          ...b,
          likes: r.likes || 0,
          dislikes: r.dislikes || 0,
          myReaction: r.myReaction || null,
        };
      });

      setBlogs(updated);
      setFiltered(updated);
    } catch (err) {
      console.error("Failed to update reaction", err);
      message.error("Failed to update reaction");
    }
  };

  useEffect(() => {
    handleFetchBlogs();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Blog Posts</h2>
        <div>
          {userData && (
            <Button type="primary" onClick={() => navigate("/create")}>
              Create Blog
            </Button>
          )}
        </div>
      </div>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Select
            value={filterType}
            onChange={(value) => setFilterType(value)}
            style={{ width: 160 }}
          >
            <Option value="country">Filter by Country</Option>
            <Option value="username">Filter by Username</Option>
          </Select>
        </Col>

        <Col>
          <Input
            placeholder={`Search by ${filterType}`}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{ width: 240 }}
          />
        </Col>

        <Col>
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </Col>

        <Col>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </Col>
      </Row>

      <Space direction="vertical" style={{ width: "100%" }}>
        {filtered.map((blog) => (
          <Card
            key={blog.id}
            title={blog.title}
            extra={<small>By {blog.author}</small>}
            actions={[
              <Tooltip title={userData ? "Like" : "Login to like"}>
                <span
                  onClick={() => {
                    if (userData) toggleReaction(blog.id, "like");
                  }}
                >
                  <LikeOutlined
                    style={{
                      color:
                        userReaction(blog) === "like" ? "green" : undefined,
                    }}
                  />{" "}
                  {countReactions(blog, "likes")}
                </span>
              </Tooltip>,

              <Tooltip title={userData ? "Dislike" : "Login to dislike"}>
                <span
                  onClick={() => {
                    if (userData) toggleReaction(blog.id, "dislike");
                  }}
                >
                  <DislikeOutlined
                    style={{
                      color:
                        userReaction(blog) === "dislike" ? "red" : undefined,
                    }}
                  />{" "}
                  {countReactions(blog, "dislikes")}
                </span>
              </Tooltip>,
            ]}
          >
            <Paragraph>
              <strong>Country:</strong> {blog.country || "N/A"}
            </Paragraph>
            <Paragraph>{blog.content}</Paragraph>
                        <Paragraph>

              <strong>Created On:</strong> <Tag color="geekblue">{blog.createdAt || "N/A"}</Tag>
                          </Paragraph>
            <Paragraph>

              <strong>Last Updated On:</strong> <Tag color="geekblue">{blog.updatedAt || "N/A"}</Tag>
            </Paragraph>

            {userData?.email === blog.author && (
              <div style={{ display: "flex", gap: 8 }}>
                <Button type="primary" onClick={() => handleEdit(blog.id)}>
                  Edit
                </Button>
                <Button danger onClick={() => handleDelete(blog.id)}>
                  Delete
                </Button>
              </div>
            )}
          </Card>
        ))}
      </Space>
    </>
  );
};

export default BlogPosts;
