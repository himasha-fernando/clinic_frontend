import React, { useState } from 'react';
import { 
  Layout, 
  Menu, 
  Breadcrumb, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Table, 
  Tag, 
  Space, 
  Button, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  TimePicker, 
  Upload, 
  Modal, 
  Avatar,
  Badge,
  Dropdown,
  message
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  ScheduleOutlined,
  FileTextOutlined,
  DashboardOutlined,
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  DownOutlined,
  BellOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons';
import "../assets/css//StaffHome.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const StaffHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [reportForm] = Form.useForm();

  // Sample data
  const appointments = [
    {
      key: '1',
      patient: 'John Smith',
      doctor: 'Dr. Sarah Johnson',
      date: '2023-06-15',
      time: '10:00 AM',
      status: 'confirmed',
      condition: 'Acne'
    },
    {
      key: '2',
      patient: 'Emily Davis',
      doctor: 'Dr. Michael Chen',
      date: '2023-06-15',
      time: '11:30 AM',
      status: 'confirmed',
      condition: 'Eczema'
    },
    {
      key: '3',
      patient: 'Robert Wilson',
      doctor: 'Dr. Sarah Johnson',
      date: '2023-06-16',
      time: '09:00 AM',
      status: 'pending',
      condition: 'Psoriasis'
    },
  ];

  const doctors = [
    {
      key: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Medical Dermatology',
      availability: 'Mon, Wed, Fri',
      slots: '10 available'
    },
    {
      key: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Cosmetic Dermatology',
      availability: 'Tue, Thu, Sat',
      slots: '5 available'
    },
  ];

  const patients = [
    {
      key: '1',
      name: 'John Smith',
      age: 32,
      gender: 'Male',
      lastVisit: '2023-05-20',
      conditions: ['Acne', 'Rosacea']
    },
    {
      key: '2',
      name: 'Emily Davis',
      age: 28,
      gender: 'Female',
      lastVisit: '2023-05-18',
      conditions: ['Eczema']
    },
  ];

  const columns = {
    appointments: [
      {
        title: 'Patient',
        dataIndex: 'patient',
        key: 'patient',
      },
      {
        title: 'Doctor',
        dataIndex: 'doctor',
        key: 'doctor',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: 'Condition',
        dataIndex: 'condition',
        key: 'condition',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => (
          <Tag color={status === 'confirmed' ? 'green' : 'orange'}>
            {status.toUpperCase()}
          </Tag>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditAppointment(record)} />
            <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDeleteAppointment(record)} />
          </Space>
        ),
      },
    ],
    doctors: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Specialty',
        dataIndex: 'specialty',
        key: 'specialty',
      },
      {
        title: 'Availability',
        dataIndex: 'availability',
        key: 'availability',
      },
      {
        title: 'Available Slots',
        dataIndex: 'slots',
        key: 'slots',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEditDoctor(record)} />
            <Button type="link" icon={<ScheduleOutlined />} onClick={() => handleEditSlots(record)} />
          </Space>
        ),
      },
    ],
    patients: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Last Visit',
        dataIndex: 'lastVisit',
        key: 'lastVisit',
      },
      {
        title: 'Conditions',
        dataIndex: 'conditions',
        key: 'conditions',
        render: conditions => (
          <>
            {conditions.map(condition => (
              <Tag color="blue" key={condition}>
                {condition}
              </Tag>
            ))}
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button type="link" icon={<FileTextOutlined />} onClick={() => viewMedicalRecords(record)} />
            <Button type="link" icon={<UploadOutlined />} onClick={() => uploadMedicalReport(record)} />
          </Space>
        ),
      },
    ]
  };

  const handleMenuClick = (e) => {
    setActiveTab(e.key);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        console.log('Received values of form: ', values);
        setIsModalVisible(false);
        form.resetFields();
        message.success('New appointment scheduled successfully!');
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const showReportModal = () => {
    setIsReportModalVisible(true);
  };

  const handleReportOk = () => {
    reportForm.validateFields()
      .then(values => {
        console.log('Received values of form: ', values);
        setIsReportModalVisible(false);
        reportForm.resetFields();
        message.success('Medical report uploaded successfully!');
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleReportCancel = () => {
    setIsReportModalVisible(false);
    reportForm.resetFields();
  };

  const handleEditAppointment = (record) => {
    console.log('Edit appointment:', record);
    // Implementation would go here
  };

  const handleDeleteAppointment = (record) => {
    console.log('Delete appointment:', record);
    // Implementation would go here
  };

  const handleEditDoctor = (record) => {
    console.log('Edit doctor:', record);
    // Implementation would go here
  };

  const handleEditSlots = (record) => {
    console.log('Edit slots for:', record);
    // Implementation would go here
  };

  const viewMedicalRecords = (record) => {
    console.log('View medical records for:', record);
    // Implementation would go here
  };

  const uploadMedicalReport = (record) => {
    console.log('Upload medical report for:', record);
    showReportModal();
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo">
         
          {!collapsed && <span style={{ color: '#fff' }}>Admin</span>}
        </div>
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['dashboard']} 
          mode="inline"
          onClick={handleMenuClick}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <SubMenu key="appointments" icon={<ScheduleOutlined />} title="Appointments">
            <Menu.Item key="schedule">Schedule New</Menu.Item>
            <Menu.Item key="view-all">View All</Menu.Item>
            <Menu.Item key="calendar">Calendar View</Menu.Item>
          </SubMenu>
          <SubMenu key="users" icon={<TeamOutlined />} title="Users">
            <Menu.Item key="register-patient">Register Patient</Menu.Item>
            <Menu.Item key="register-doctor">Register Doctor</Menu.Item>
            <Menu.Item key="register-staff">Register Staff</Menu.Item>
            <Menu.Item key="manage-users">Manage Users</Menu.Item>
          </SubMenu>
          <SubMenu key="reports" icon={<FileTextOutlined />} title="Medical Records">
            <Menu.Item key="upload-report">Upload Report</Menu.Item>
            <Menu.Item key="view-reports">View Reports</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
            <h2 style={{ color: '#fff', margin: 0 }}>
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'schedule' && 'Schedule Appointment'}
              {activeTab === 'view-all' && 'All Appointments'}
              {activeTab === 'register-patient' && 'Register Patient'}
              {activeTab === 'register-doctor' && 'Register Doctor'}
              {activeTab === 'register-staff' && 'Register Staff'}
              {activeTab === 'upload-report' && 'Upload Medical Report'}
            </h2>
            <Space size="large">
              <Badge count={5}>
                <BellOutlined style={{ fontSize: '20px', color: '#fff' }} />
              </Badge>
              <Dropdown overlay={menu}>
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  <span style={{ color: '#fff' }}>Admin User</span>
                  <DownOutlined style={{ color: '#fff' }} />
                </Space>
              </Dropdown>
            </Space>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Panadura General Hospital - Dermatology Clinic</Breadcrumb.Item>
            <Breadcrumb.Item>{activeTab}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {activeTab === 'dashboard' && (
              <>
                <Row gutter={16}>
                  <Col span={6}>
                    <Card>
                      <Statistic
                        title="Total Appointments"
                        value={124}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ScheduleOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card>
                      <Statistic
                        title="Active Patients"
                        value={89}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<TeamOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card>
                      <Statistic
                        title="Doctors"
                        value={7}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<UserOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card>
                      <Statistic
                        title="Pending Reports"
                        value={12}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<FileTextOutlined />}
                      />
                    </Card>
                  </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: 16 }}>
                  <Col span={12}>
                    <Card 
                      title="Recent Appointments" 
                      extra={<Button type="primary" icon={<PlusOutlined />} onClick={showModal}>New</Button>}
                    >
                      <Table 
                        columns={columns.appointments} 
                        dataSource={appointments} 
                        pagination={{ pageSize: 5 }} 
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="Doctors Schedule">
                      <Table 
                        columns={columns.doctors} 
                        dataSource={doctors} 
                        pagination={{ pageSize: 5 }} 
                      />
                    </Card>
                  </Col>
                </Row>
                <Row style={{ marginTop: 16 }}>
                  <Col span={24}>
                    <Card title="Patient List">
                      <Table 
                        columns={columns.patients} 
                        dataSource={patients} 
                        pagination={{ pageSize: 5 }} 
                      />
                    </Card>
                  </Col>
                </Row>
              </>
            )}
            {activeTab === 'schedule' && (
              <Card title="Schedule New Appointment">
                <Form
                  form={form}
                  layout="vertical"
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="patient"
                        label="Patient"
                        rules={[{ required: true, message: 'Please select a patient' }]}
                      >
                        <Select placeholder="Select patient" showSearch>
                          <Option value="john">John Smith</Option>
                          <Option value="emily">Emily Davis</Option>
                          <Option value="robert">Robert Wilson</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="doctor"
                        label="Doctor"
                        rules={[{ required: true, message: 'Please select a doctor' }]}
                      >
                        <Select placeholder="Select doctor">
                          <Option value="sarah">Dr. Sarah Johnson</Option>
                          <Option value="michael">Dr. Michael Chen</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="date"
                        label="Date"
                        rules={[{ required: true, message: 'Please select date' }]}
                      >
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="time"
                        label="Time"
                        rules={[{ required: true, message: 'Please select time' }]}
                      >
                        <TimePicker style={{ width: '100%' }} format="HH:mm" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    name="condition"
                    label="Condition"
                    rules={[{ required: true, message: 'Please input condition' }]}
                  >
                    <Input placeholder="e.g. Acne, Eczema, Psoriasis" />
                  </Form.Item>
                  <Form.Item
                    name="notes"
                    label="Notes"
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Schedule Appointment
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}
            {activeTab === 'register-doctor' && (
              <Card title="Register New Doctor">
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter first name' }]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter last name' }]}
                      >
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, type: 'email', message: 'Please enter valid email' }]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="specialty"
                        label="Specialty"
                        rules={[{ required: true, message: 'Please select specialty' }]}
                      >
                        <Select placeholder="Select specialty">
                          <Option value="medical">Medical Dermatology</Option>
                          <Option value="cosmetic">Cosmetic Dermatology</Option>
                          <Option value="surgical">Surgical Dermatology</Option>
                          <Option value="pediatric">Pediatric Dermatology</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please enter phone number' }]}
                      >
                        <Input placeholder="Phone" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    name="availability"
                    label="Availability"
                    rules={[{ required: true, message: 'Please select availability' }]}
                  >
                    <Select mode="multiple" placeholder="Select available days">
                      <Option value="monday">Monday</Option>
                      <Option value="tuesday">Tuesday</Option>
                      <Option value="wednesday">Wednesday</Option>
                      <Option value="thursday">Thursday</Option>
                      <Option value="friday">Friday</Option>
                      <Option value="saturday">Saturday</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Register Doctor
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}
          </div>
        </Content>
        
      </Layout>

      {/* Schedule Appointment Modal */}
      <Modal 
        title="Schedule New Appointment" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="patient"
                label="Patient"
                rules={[{ required: true, message: 'Please select a patient' }]}
              >
                <Select placeholder="Select patient" showSearch>
                  <Option value="john">John Smith</Option>
                  <Option value="emily">Emily Davis</Option>
                  <Option value="robert">Robert Wilson</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="doctor"
                label="Doctor"
                rules={[{ required: true, message: 'Please select a doctor' }]}
              >
                <Select placeholder="Select doctor">
                  <Option value="sarah">Dr. Sarah Johnson</Option>
                  <Option value="michael">Dr. Michael Chen</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: 'Please select date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Time"
                rules={[{ required: true, message: 'Please select time' }]}
              >
                <TimePicker style={{ width: '100%' }} format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="condition"
            label="Condition"
            rules={[{ required: true, message: 'Please input condition' }]}
          >
            <Input placeholder="e.g. Acne, Eczema, Psoriasis" />
          </Form.Item>
          <Form.Item
            name="notes"
            label="Notes"
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Upload Medical Report Modal */}
      <Modal 
        title="Upload Medical Report" 
        visible={isReportModalVisible} 
        onOk={handleReportOk} 
        onCancel={handleReportCancel}
        width={800}
      >
        <Form
          form={reportForm}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="patient"
                label="Patient"
                rules={[{ required: true, message: 'Please select a patient' }]}
              >
                <Select placeholder="Select patient" showSearch>
                  <Option value="john">John Smith</Option>
                  <Option value="emily">Emily Davis</Option>
                  <Option value="robert">Robert Wilson</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="doctor"
                label="Doctor"
                rules={[{ required: true, message: 'Please select a doctor' }]}
              >
                <Select placeholder="Select doctor">
                  <Option value="sarah">Dr. Sarah Johnson</Option>
                  <Option value="michael">Dr. Michael Chen</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="reportType"
            label="Report Type"
            rules={[{ required: true, message: 'Please select report type' }]}
          >
            <Select placeholder="Select report type">
              <Option value="biopsy">Biopsy Report</Option>
              <Option value="blood">Blood Test</Option>
              <Option value="allergy">Allergy Test</Option>
              <Option value="imaging">Imaging Results</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="reportDate"
            label="Report Date"
            rules={[{ required: true, message: 'Please select report date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="findings"
            label="Findings"
          >
            <TextArea rows={4} placeholder="Enter findings from the report" />
          </Form.Item>
          <Form.Item
            name="file"
            label="Upload Report File"
            valuePropName="fileList"
            getValueFromEvent={e => e.fileList}
            rules={[{ required: true, message: 'Please upload report file' }]}
          >
            <Upload name="report" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default StaffHome;