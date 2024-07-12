import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/categories');
      setCategories(response.data);
    } catch (error) {
      message.error('Failed to fetch categories');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${id}`);
      message.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      message.error('Failed to delete category');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    form.setFieldsValue({ name: category.name });
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await axios.put(`https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${editingCategory._id}`, values);
        message.success('Category updated successfully');
      } else {
        await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/categories', values);
        message.success('Category added successfully');
      }
      fetchCategories();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save category');
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Category
      </Button>
      <Table columns={columns} dataSource={categories} rowKey="_id" />
      <Modal
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the category name!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
