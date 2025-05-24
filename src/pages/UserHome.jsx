import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Layout, 
  Card, 
  Avatar, 
  Typography, 
  Row, 
  Col, 
  Descriptions, 
  Button,
  Space,
  Divider
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  IdcardOutlined,
  EditOutlined,
  CalendarOutlined,
  FileTextOutlined,
  TeamOutlined
} from '@ant-design/icons';
import UserHeader from "../components/UserHeader";
import "../assets/css/UserHome.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const UserHome = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userNic, setUserNic] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setUserId(localStorage.getItem("userID") || "");
    setUserName(localStorage.getItem("userName") || "");
    setUserEmail(localStorage.getItem("userEmail") || "");
    setUserNic(localStorage.getItem("userNic") || "");
    setAvatar(localStorage.getItem("userAvatar") || "");
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <UserHeader />
         
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div className="site-layout-background" style={{ padding: 24 }}>
          <Card>
            <Row gutter={24}>
              <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
                <Avatar 
                  size={128} 
                  src={avatar} 
                  icon={<UserOutlined />}
                  style={{ marginBottom: 16 }}
                />
                <Title level={4} style={{ marginBottom: 0 }}>{userName || "Unknown User"}</Title>
                <Text type="secondary">Patient</Text>
                
                <Divider />
                
                <Link to="/edit-profile">
                  <Button type="primary" icon={<EditOutlined />} style={{ width: '100%' }}>
                    Edit Profile
                  </Button>
                </Link>
              </Col>
              
              <Col xs={24} sm={16}>
                <Title level={4} style={{ marginBottom: 24 }}>Personal Information</Title>
                
                <Descriptions column={1}>
                  <Descriptions.Item label={<><MailOutlined /> Email</>}>
                    {userEmail || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label={<><IdcardOutlined /> NIC</>}>
                    {userNic || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label={<><UserOutlined /> User ID</>}>
                    <Text code>{userId || "N/A"}</Text>
                  </Descriptions.Item>
                </Descriptions>
                
                <Divider />
                
                <Title level={4} style={{ marginBottom: 16 }}>Quick Actions</Title>
                
                <Row gutter={16}>
                  <Col xs={24} sm={12} md={8} style={{ marginBottom: 16 }}>
                    <Link to="/p-appointment">
                      <Card hoverable>
                        <Space direction="vertical" align="center" style={{ width: '100%' }}>
                          <CalendarOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                          <Text strong>Book Appointment</Text>
                        </Space>
                      </Card>
                    </Link>
                  </Col>
                  
                  <Col xs={24} sm={12} md={8} style={{ marginBottom: 16 }}>
                    <Link to="/p-download-report">
                      <Card hoverable>
                        <Space direction="vertical" align="center" style={{ width: '100%' }}>
                          <FileTextOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                          <Text strong>View Reports</Text>
                        </Space>
                      </Card>
                    </Link>
                  </Col>
                  
                  <Col xs={24} sm={12} md={8} style={{ marginBottom: 16 }}>
                    <Link to="/dermatologists">
                      <Card hoverable>
                        <Space direction="vertical" align="center" style={{ width: '100%' }}>
                          <TeamOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                          <Text strong>Our Dermatologists</Text>
                        </Space>
                      </Card>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default UserHome;