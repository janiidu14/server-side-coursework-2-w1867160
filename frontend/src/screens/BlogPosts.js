import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  message,
  Input,
  Row,
  Col,
  Select,
  Tooltip,
  Tag,
  Pagination,
  Tabs,
} from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { deleteBlogById, fetchBlogs } from "../services/blogService";
import { useAuth } from "../context/AuthContext";
import {
  createReaction,
  fetchReactionsToAllBlogs,
  fetchReactionsToAllBlogsPublic,
} from "../services/reactionService";
import { fetchFollowingByUserId } from "../services/userInteractionService";
const { Option } = Select;

const { TabPane } = Tabs;

const { Paragraph } = Typography;

const BlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterType, setFilterType] = useState("country");
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
const [showFollowing, setShowFollowing] = useState(false);
  const [followingIds, setFollowingIds] = useState([]);

  const pageSize = 6;

  const paginatedBlogs = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
      const visibleBlogs = showFollowing
  ? enriched.filter((b) => followingIds.includes(b.userId))
  : enriched;
console.log("v", visibleBlogs)

      setBlogs(visibleBlogs);
      setFiltered(visibleBlogs);
    } catch {
      message.error("Failed to fetch blogs");
    }
  };

  const handleFetchUserFollowing = async () => {
        try {
  
          const followingRes = await 
            fetchFollowingByUserId(userData?.id);
  
          setFollowingIds(followingRes.data.map((u) => u.id));
        } catch (err) {
          message.error('Failed to load users');
          console.error(err);
        } 
      };

  const handleEdit = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  const handleDelete = async (id) => {
    try {
      const updated = blogs.filter((b) => b.id !== id);
      setBlogs(updated);
      await deleteBlogById(id);
      setFiltered(updated);
      message.success("Blog Deleted Successfully");
    } catch {
      message.error("Deleting Blog Failed");
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

  const handleSortChange = (value) => {
    let sorted = [...blogs]; 

    if (value === "newest") {
      sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } else if (value === "likes") {
      sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }

    setFiltered(sorted);
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
  }, [showFollowing]);

    useEffect(() => {
    handleFetchBlogs();
    if (userData) {
    handleFetchUserFollowing();
    }
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
                <div style={{ display: "flex", gap: 8 }}>
            <Button type="primary" onClick={() => navigate("/create")}>
              Create Blog
            </Button>
             <Button type="primary"   onClick={() => setShowFollowing((prev) => !prev)}
>
  {showFollowing ? 'Show All Blogs' : 'Show Following Blogs'}
            </Button>
            </div>
          )}
        </div>
      </div>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Select
            defaultValue="newest"
            style={{ width: 200, marginBottom: 16 }}
            onChange={handleSortChange}
          >
            <Option value="newest">Newest</Option>
            <Option value="likes">Most Liked</Option>
          </Select>{" "}
        </Col>

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
      <Row gutter={[16, 16]}>
        {paginatedBlogs.map((blog) => (
          <Col key={blog.id} xs={24} sm={24} md={12} lg={12}>
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
                <strong>Visited On:</strong>{" "}
                <Tag color="green">{blog.visitDate || "N/A"}</Tag>
              </Paragraph>
              <Paragraph>
                <strong>Created On:</strong>{" "}
                <Tag color="geekblue">{blog.createdAt || "N/A"}</Tag>
              </Paragraph>
              <Paragraph>
                <strong>Last Updated On:</strong>{" "}
                <Tag color="geekblue">{blog.updatedAt || "N/A"}</Tag>
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
          </Col>
        ))}
      </Row>
       <Pagination
      current={currentPage}
      pageSize={pageSize}
      total={filtered.length}
      onChange={(page) => setCurrentPage(page)}
      style={{ textAlign: 'center', marginTop: 24 }}
    />
    </>
  );
};

export default BlogPosts;
