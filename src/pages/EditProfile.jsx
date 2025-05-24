import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Layout, 
  Menu, 
  Avatar, 
  Typography, 
  message,
  Upload,
  Row,
  Col
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  ArrowLeftOutlined,
  UploadOutlined,
  CameraOutlined
} from '@ant-design/icons';
import "../assets/css/EditProfile.css";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const EditProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // Pre-fill form from localStorage
    form.setFieldsValue({
      name: localStorage.getItem("userName") || "",
      email: localStorage.getItem("userEmail") || "",
      nic: localStorage.getItem("userNic") || "",
    });
    
    // Load avatar if exists
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, [form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    const userId = localStorage.getItem("userID");

    try {
      // In a real app, you would upload the avatar first if changed
      const response = await axios.put(`http://localhost:8080/api/auth/update/${userId}`, values);
      
      // Update localStorage
      localStorage.setItem("userName", values.name);
      localStorage.setItem("userEmail", values.email);
      localStorage.setItem("userNic", values.nic);
      
      message.success('Profile updated successfully!');
      navigate("/user-home");
    } catch (err) {
      console.error("Update failed:", err);
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      // In a real app, you would upload the image and get the URL
      const avatarUrl = URL.createObjectURL(info.file.originFileObj);
      setAvatar(avatarUrl);
      localStorage.setItem("userAvatar", avatarUrl);
      message.success('Avatar uploaded successfully');
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} className="site-layout-sider">
        <div className="logo">
          <UserOutlined style={{ fontSize: '24px', color: '#fff', marginRight: '8px' }} />
          <span style={{ color: '#fff' }}>Dermatology Clinic</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['profile']}>
          <Menu.Item key="dashboard" onClick={() => navigate('/user-home')}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="profile" onClick={() => navigate('/edit-profile')}>
            Edit Profile
          </Menu.Item>
          <Menu.Item key="appointments" onClick={() => navigate('/appointments')}>
            My Appointments
          </Menu.Item>
          <Menu.Item key="reports" onClick={() => navigate('/medical-reports')}>
            Medical Reports
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/user-home')}
              style={{ color: '#fff' }}
            >
              Back
            </Button>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#fff', marginRight: 16 }}>
                {localStorage.getItem("userName") || 'User'}
              </span>
              <Avatar 
                src={avatar} 
                icon={<UserOutlined />} 
                style={{ backgroundColor: '#1890ff' }}
              />
            </div>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Card>
              <Title level={3} style={{ marginBottom: 24 }}>Edit Profile</Title>
              
              <Row gutter={24}>
                <Col span={8} style={{ textAlign: 'center' }}>
                  <Upload
                    name="avatar"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleAvatarChange}
                    customRequest={({ file, onSuccess }) => {
                      setTimeout(() => {
                        onSuccess("ok");
                      }, 0);
                    }}
                  >
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <Avatar 
                        src={avatar} 
                        icon={<UserOutlined />} 
                        size={128}
                        style={{ marginBottom: 16 }}
                      />
                      <Button 
                        type="primary" 
                        shape="circle" 
                        icon={<CameraOutlined />}
                        style={{ 
                          position: 'absolute', 
                          bottom: 20, 
                          right: 10,
                          zIndex: 1 
                        }}
                      />
                    </div>
                  </Upload>
                  <p style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Click to upload new photo</p>
                </Col>
                <Col span={16}>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                  >
                    <Form.Item
                      name="name"
                      label="Full Name"
                      rules={[{ required: true, message: 'Please input your name' }]}
                    >
                      <Input 
                        prefix={<UserOutlined />} 
                        placeholder="Enter your full name" 
                      />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Please input your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input 
                        prefix={<MailOutlined />} 
                        placeholder="Enter your email" 
                      />
                    </Form.Item>

                    <Form.Item
                      name="nic"
                      label="NIC Number"
                      rules={[{ required: true, message: 'Please input your NIC' }]}
                    >
                      <Input 
                        prefix={<IdcardOutlined />} 
                        placeholder="Enter your NIC number" 
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading}
                        style={{ marginRight: 16 }}
                      >
                        Save Changes
                      </Button>
                      <Button onClick={() => navigate('/user-home')}>
                        Cancel
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default EditProfile;