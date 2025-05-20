import React, { useEffect, useState } from 'react';
import { List, Typography, Tag, Spin, message, Button } from 'antd';
import { fetchUsers } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { createUserInteraction, deleteInteractionByUserId, fetchFollowingByUserId } from '../services/userInteractionService';

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

        // Fetch all users and current user's following list
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
      <Title level={2}>Discover Users</Title>
      <List
        bordered
        dataSource={users}
        renderItem={(user) => {
          const isFollowing = followingIds.includes(user.id);

          return (
            <List.Item
              actions={[
                isFollowing ? (
                  <Button type="default" onClick={() => handleUnfollow(user.id)}>
                    Unfollow
                  </Button>
                ) : (
                  <Button type="primary" onClick={() => handleFollow(user.id)}>
                    Follow
                  </Button>
                ),
              ]}
            >
              Name: <Tag>{user.name}</Tag> | Email: <Tag>{user.email}</Tag>
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default DisplayUsers;
