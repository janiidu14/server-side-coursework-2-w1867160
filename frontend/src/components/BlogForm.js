// BlogForm.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, DatePicker } from 'antd';
// import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { createBlog, updateBlogById } from '../services/blogService';
// import moment from 'moment';

const BlogForm = ({ blog, isEdit = false }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();


  const [dateLabel, setDateLabel] = useState("Date of Visit")

  useEffect(() => {
    if (isEdit && blog) {
      const { visitDate, ...rest } = blog;
      form.setFieldsValue(rest);
  
      // Show original date in the label
      if (visitDate) {
        setDateLabel(`Date of Visit: ${visitDate}`);
      }
    }
  }, [isEdit, blog, form]);
  
  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        visitDate: values.visitDate ? values.visitDate.format('YYYY-MM-DD') : null
      };
      // await axios.get('/auth/csrf-token');

      if (isEdit) {
        await updateBlogById(id, values);
        message.success('Blog updated');
      } else {
        await createBlog(payload);
        message.success('Blog created');
      }

      navigate('/blogs');
    } catch (err) {
      message.error('Action failed');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="country" label="Country" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
  name="visitDate"
  label={dateLabel}
  rules={[{ required: isEdit ? false: true, message: 'Please select a date' }]}
>
  <DatePicker format="YYYY-MM-DD" />
</Form.Item>

      <Form.Item name="content" label="Content" rules={[{ required: true }]}>
        <Input.TextArea rows={5} />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" block>
          {isEdit ? 'Update Blog' : 'Create Blog'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BlogForm;
