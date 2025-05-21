import React, { useEffect, useState } from 'react';
import { List, Typography, Tag, Spin, message, Button, Card, Avatar, Row, Col } from 'antd';
import { fetchUsers } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { createUserInteraction, deleteInteractionByUserId, fetchFollowingByUserId } from '../services/userInteractionService';
import {
  UserOutlined
} from "@ant-design/icons";

const { Title } = Typography;

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const [followingIds, setFollowingIds] = useState([]);
  const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const userData = user?.data || null;
    const currentUserId = userData?.id || null;
  

  useEffect(() => {
    const fetchData = async () => {
      try {

        const [usersRes, followingRes] = await Promise.all([
          fetchUsers(),
          fetchFollowingByUserId(currentUserId)
        ]);

        const otherUsers = usersRes.data.filter((u) => u.id !== currentUserId);
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

  const handleFollow = async (userId) => {
    try {
      const payload = {
        followerId: currentUserId,
        followingId: userId
      };
      await createUserInteraction(payload);
      setFollowingIds(prev => [...prev, userId]);
      message.success('Followed user');
    } catch (err) {
      message.error('Failed to follow user');
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const payload = {
        followingId: userId
      };
      await deleteInteractionByUserId(currentUserId, payload);
      setFollowingIds(prev => prev.filter(id => id !== userId));
      message.success('Unfollowed user');
    } catch (err) {
      message.error('Failed to unfollow user');
    }
  };

  if (loading) return <Spin />;

  return (
    <>
        <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>User Feed</h2>
        </div>
    <Row gutter={[16, 16]}>
  {users.map((user) => {
    const isFollowing = followingIds.includes(user?.id);

    return (
      <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
        <Card
          title={user?.name}
          style={{ textAlign: 'center' }}
          actions={[
            isFollowing ? (
              <Button onClick={() => handleUnfollow(user?.id)}>Unfollow</Button>
            ) : (
              <Button type="primary" onClick={() => handleFollow(user?.id)}>Follow</Button>
            )
          ]}
        >
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ marginBottom: 16 }}
          />
            <p>
           <Tag color="blue">Name </Tag><strong>{user?.name} </strong>
          </p>
            <p>
           <Tag color="blue">Email </Tag><strong>{user?.email} </strong>
          </p>
           
        </Card>
      </Col>
    );
  })}
</Row>
    </>
  );
};

export default DisplayUsers;
