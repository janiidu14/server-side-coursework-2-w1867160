import React, { useEffect, useState } from 'react';
// import axios from '../api/axios';
import { Card, Typography, Button, Space, message, Input, Row, Col, Select } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

import { mockBlogs, mockLikes, mockCurrentUser } from '../common/constants';
import { Link, useNavigate } from "react-router-dom";
import BlogForm from '../components/BlogForm';
import Search from 'antd/es/transfer/search';
import { fetchBlogs } from '../services/blogService';
import { useAuth } from '../context/AuthContext';
const { Option } = Select;

const { Title, Paragraph } = Typography;

const BlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterType, setFilterType] = useState('country');
  const [filterText, setFilterText] = useState('');
  const [currentUser, setCurrentUser] = useState(mockCurrentUser);
  const [userInteractions, setUserInteractions] = useState([]);
  
  const { user } = useAuth();

  const userData = user?.data || null;
  console.log(userData);

  const navigate = useNavigate();


  const handleFetchBlogs = async () => {
    try {
      const res = await fetchBlogs();
      setBlogs(res.data);
      setFiltered(res.data);

      // setBlogs(mockBlogs)
      // setFiltered(mockBlogs);

    } catch {
      message.error('Failed to fetch blogs');
    }
  };

  const handleEdit = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  const handleDelete = async (id) => {
    try {
      // await axios.delete(`/blogs/${id}`);
      // setBlogs(blogs.filter(b => b.id !== id));
      // setBlogs(prev => prev.filter(b => b.id !== id));
      // setFiltered(prev => prev.filter(b => b.id !== id));

      // const updated = blogs.filter((b) => b.id !== id);
      // setBlogs(updated);
      // setFiltered(updated);
      message.success('Deleted');
    } catch {
      message.error('Delete failed');
    }
  };

  const handleSearch = () => {
    const lower = filterText.toLowerCase();
    const result = blogs.filter((b) => {
      if (filterType === 'country') return b.country?.toLowerCase().includes(lower);
      if (filterType === 'username') return b.author?.toLowerCase().includes(lower);
      return true;
    });
    setFiltered(result);
  };

  const clearFilters = () => {
    setFiltered(blogs);
    setFilterText('');
    setFilterType('country');
  };

  useEffect(() => {
    handleFetchBlogs();
    setUserInteractions(mockLikes); // load mock likes/dislikes
  }, []);

  const countReactions = (blogId, type) =>
    userInteractions.filter((r) => r.blogId === blogId && r.type === type).length;

  const userReaction = (blogId) =>
    userInteractions.find((r) => r.blogId === blogId && r.userId === userData.id)?.type;

  const toggleReaction = (blogId, type) => {
    const existing = userInteractions.find((r) => r.blogId === blogId && r.userId === userData.id);

    let updated;
    if (existing && existing.type === type) {
      // Remove reaction
      updated = userInteractions.filter((r) => !(r.blogId === blogId && r.userId === userData.id));
    } else if (existing) {
      // Switch reaction
      updated = userInteractions.map((r) =>
        r.blogId === blogId && r.userId === userData.id ? { ...r, type } : r
      );
    } else {
      // Add new reaction
      updated = [...userInteractions, { blogId, userId: userData.id, type }];
    }

    setUserInteractions(updated);
  };
  return (
    <>
      <Title level={2}>Blog Posts</Title>
      {userData && (

      <Button type="primary" onClick={() => navigate('/create')}>
        Create Blog
      </Button>
      )}
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

      <Space direction="vertical" style={{ width: '100%' }}>
        {filtered.map((blog) => (
          <Card
            key={blog.id}
            title={blog.title}
            extra={<small>By {blog.author}</small>}
            actions={[
              <span onClick={() => toggleReaction(blog.id, 'like')}>
                <LikeOutlined style={{ color: userReaction(blog.id) === 'like' ? 'green' : undefined }} />{' '}
                {countReactions(blog.id, 'like')}
              </span>,
              <span onClick={() => toggleReaction(blog.id, 'dislike')}>
                <DislikeOutlined style={{ color: userReaction(blog.id) === 'dislike' ? 'red' : undefined }} />{' '}
                {countReactions(blog.id, 'dislike')}
              </span>
            ]}
          >
            <Paragraph>
              <strong>Country:</strong> {blog.country || 'N/A'}
            </Paragraph>
            <Paragraph>{blog.content}</Paragraph>

            {userData?.email === blog.author && (
              <>
  <Button type="primary" onClick={() => handleEdit(blog.id)}>
    Edit
  </Button>
                  <Button danger onClick={() => handleDelete(blog.id)}>
                  Delete
                </Button>
                </>
            )} 
          </Card>
        ))}
      </Space>
    </>
  );
};

export default BlogPosts;