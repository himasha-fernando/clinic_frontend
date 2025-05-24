import React from "react";
import { Link, NavLink } from "react-router-dom";
import { 
  Layout, 
  Menu, 
  Avatar, 
  Button, 
  Dropdown, 
  Space, 
  Typography,
  Badge,
  Divider
} from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  NotificationOutlined,
  CalendarOutlined,
  FileTextOutlined,
  TeamOutlined
} from '@ant-design/icons';
import "../assets/css/UserHeader.css";

const { Header } = Layout;
const { Text } = Typography;

const UserHeader = () => {
  const userName = localStorage.getItem("userName") || "User";
  const userAvatar = localStorage.getItem("userAvatar") || null;
  
  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/user-home">Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <Link to="/">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="user-header">
      <div className="logo">
        <Link to="/user-home">
          <Space>
            <Avatar 
              src="/images/20.jpg" 
              size="large" 
              style={{ backgroundColor: '#1890ff' }} 
            />
            <Text strong style={{ color: '#fff' }}>Panadura Base Hospital</Text>
          </Space>
        </Link>
      </div>
      
      <Menu theme="dark" mode="horizontal" className="nav-menu">
        <Menu.Item key="home" icon={<UserOutlined />}>
          <NavLink to="/user-home">Profile</NavLink>
        </Menu.Item>
        <Menu.Item key="appointments" icon={<CalendarOutlined />}>
          <NavLink to="/p-appointment">Book Appointment</NavLink>
        </Menu.Item>
        <Menu.Item key="reports" icon={<FileTextOutlined />}>
          <NavLink to="/p-download-report">Reports</NavLink>
        </Menu.Item>
        <Menu.Item key="dermatologists" icon={<TeamOutlined />}>
          <NavLink to="/dermatologists">Dermatologists</NavLink>
        </Menu.Item>
      </Menu>
      
      <Space size="large" className="user-actions">
        <Badge count={5}>
          <Button 
            type="text" 
            icon={<NotificationOutlined style={{ color: '#fff', fontSize: 18 }} />}
          />
        </Badge>
        
        <Dropdown overlay={menu} placement="bottomRight">
          <Space>
            <Avatar 
              src={userAvatar} 
              icon={<UserOutlined />} 
              style={{ backgroundColor: '#1890ff' }}
            />
            <Text style={{ color: '#fff' }}>{userName}</Text>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default UserHeader;