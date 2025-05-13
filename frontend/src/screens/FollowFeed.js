import { useEffect, useState } from 'react';

import { Card, Typography, Space } from 'antd';
import { mockCurrentUser, mockBlogs, mockFollows } from '../common/constants';

const { Title, Paragraph } = Typography;


const FollowFeed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const followedIds = mockFollows
      .filter(f => f.followerId === mockCurrentUser.id)
      .map(f => f.followingId);

    const filtered = mockBlogs.filter(b => followedIds.includes(b.authorId));
    setFeed(filtered);
  }, []);

  return (
    <>
      <Title level={2}>Following Feed</Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        {feed.map(blog => (
          <Card key={blog.id} title={blog.title} extra={<small>{blog.author}</small>}>
            <Paragraph>{blog.content}</Paragraph>
          </Card>
        ))}
      </Space>
    </>
  );
};

export default FollowFeed;
