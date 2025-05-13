import { useEffect, useState } from 'react';

import { List, Typography, Button } from 'antd';
import { fetchFollowersByUserId, fetchFollowingByUserId } from '../services/userInteractionService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ProfilePage = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

    const navigate = useNavigate()

    const { user } = useAuth();
  
    const userData = user?.data || null;

  useEffect(() => {
    const fetchFollows = async () => {
      try {
        const [followersResult, followingResult] = await Promise.all([
          fetchFollowersByUserId(userData?.id),
          fetchFollowingByUserId(userData?.id)
        ]);
  
        setFollowers(followersResult.data);
        setFollowing(followingResult.data);
      } catch (err) {
        console.error('Failed to fetch followers or following:', err);
      }
    };
  
    fetchFollows();
  }, []);

  const handleFetchAllUsers = () => {
    navigate(`/users`);
  };


  return (
    <>
      <Title level={2}>My Profile</Title>
      <Button type="primary" onClick={() => handleFetchAllUsers()}>
    All Users
  </Button>
      <Title level={4}>Followers</Title>
      <List
        bordered
        dataSource={followers}
        renderItem={u => <List.Item>{u.name} ({u.email})</List.Item>}
      />

      <Title level={4}>Following</Title>
      <List
        bordered
        dataSource={following}
        renderItem={u => (
          <List.Item>
            {u.name} ({u.email})
            <Button type="link">Unfollow</Button> {/* placeholder */}
          </List.Item>
        )}
      />
    </>
  );
};

export default ProfilePage;
