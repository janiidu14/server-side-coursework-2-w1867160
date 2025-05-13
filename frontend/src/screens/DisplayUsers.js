import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { List, Typography, Tag, Spin, message } from 'antd';

const { Title } = Typography;

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); // or get from AuthContext

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch logged-in user
        const meRes = await axios.get('/auth/me');
        const userId = meRes.data.id;
        setCurrentUser(meRes.data);

        // Fetch all users and current user's following list
        const [usersRes, followingRes] = await Promise.all([
          axios.get('/users'),
          axios.get('/follows/following')
        ]);

        const otherUsers = usersRes.data.filter((u) => u.id !== userId);
        setUsers(otherUsers);
        setFollowingIds(followingRes.data.map((u) => u.id));
      } catch (err) {
        message.error('Failed to load users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spin />;

  return (
    <>
      <Title level={2}>Discover Users</Title>
      <List
        bordered
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            {user.name || user.email}
            {followingIds.includes(user.id) && (
              <Tag color="blue" style={{ marginLeft: 'auto' }}>
                Following
              </Tag>
            )}
          </List.Item>
        )}
      />
    </>
  );
};

export default DisplayUsers;
