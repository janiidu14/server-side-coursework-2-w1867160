import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Spin, message } from "antd";
import BlogForm from "./BlogForm";
import { fetchBlogById } from "../services/blogService";

const { Title } = Typography;

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetchBlogById(id);
        setBlog(res.data);
        setLoading(false);
      } catch {
        message.error("Blog Not Found");
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <Spin />;

  return (
    <>
      <Title level={2}>Edit Blog</Title>
      <BlogForm blog={blog} isEdit />
    </>
  );
};

export default EditBlog;
