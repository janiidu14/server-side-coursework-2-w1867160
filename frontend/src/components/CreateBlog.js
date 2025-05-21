import { Typography } from 'antd';
import BlogForm from './BlogForm';

const { Title } = Typography;

const CreateBlog = () => {
  return (
    <>
      <Title level={2}>Create New Blog</Title>
      <BlogForm />
    </>
  );
};

export default CreateBlog;
