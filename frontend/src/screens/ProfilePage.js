import { useEffect, useState } from 'react';

import { List, Typography, Button, Card, message } from 'antd';
import { fetchFollowersByUserId, fetchFollowingByUserId } from '../services/userInteractionService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Paragraph from 'antd/es/skeleton/Paragraph';
import { fetchUserById } from '../services/userService';

const { Title } = Typography;

const ProfilePage = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [currentUser, setCurrentUser] = useState(null)

    const navigate = useNavigate()

    const { user } = useAuth();
  
    const userData = user?.data || null;

  const handleFetchUser = async () => {
    try{
      const userData = await fetchUserById(user?.data?.id);
      setCurrentUser(userData)
    } catch {
      message.error("Failed to fetch blogs");
    }
  }

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
    handleFetchUser()
  }, []);


  const handleFetchAllUsers = () => {
    navigate(`/users`);
  };


  return (
    <>
            <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>My Profile</h2>
        <div>
         <Button type="primary" onClick={() => handleFetchAllUsers()}>
    All Users
  </Button>
        </div>
      </div>
      <Card>
         <Paragraph>
              <strong>Country:</strong> {"blog.country "|| "N/A"}
            </Paragraph>
      </Card>
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
          </List.Item>
        )}
      />
    </>
  );
};

export default ProfilePage;
