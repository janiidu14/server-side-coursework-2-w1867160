import { useEffect, useState } from 'react';

import { List, Typography, Button, Card, message, Tag, Avatar, Col, Row } from 'antd';
import { fetchFollowersByUserId, fetchFollowingByUserId } from '../services/userInteractionService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchUserById } from '../services/userService';
import {
  UserOutlined
} from "@ant-design/icons";
const { Title, Paragraph } = Typography;

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
      setCurrentUser(userData?.data)
    } catch {
      message.error("Failed to fetch user");
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
      <Card           style={{ textAlign: 'center' }}
>

                          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ marginBottom: 16 }}
          />
          <p>
           <Tag color="blue">Name </Tag><strong>{currentUser?.name} </strong>
          </p>
          <p>
           <Tag color="blue">Email </Tag><strong>{currentUser?.email} </strong>
          </p>
          <p>
           <Tag color="blue">Created On </Tag><strong>{currentUser?.createdAt} </strong>
          </p>
      </Card>
      <Title level={4}>Followers</Title>
      <Row gutter={[16, 16]}>
  {followers.map((user) => (
    <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
      <Card
        title={user?.name}
        style={{ textAlign: 'center' }}
      >
        <Avatar
          icon={<UserOutlined />}
          size={64}
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
  ))}
</Row>

      <Title level={4}>Following</Title>
      <Row gutter={[16, 16]}>
  {following.map((user) => (
    <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
      <Card
        title={user?.name}
        style={{ textAlign: 'center' }}
      >
        <Avatar
          icon={<UserOutlined />}
          size={64}
          style={{ marginBottom: 16 }}
        />     <p>
                     <Tag color="blue">Name </Tag><strong>{user?.name} </strong>
                    </p>
                      <p>
                     <Tag color="blue">Email </Tag><strong>{user?.email} </strong>
                    </p>
      </Card>
    </Col>
  ))}
</Row>
    </>
  );
};

export default ProfilePage;
