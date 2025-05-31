import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Card,
  Table,
  Space,
  Modal,
  message,
} from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  ProfileOutlined,
  UserAddOutlined,
  TeamOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import ReportUpload from "./AdminUploadReport";
import ScheduleForm from "./AdminScheduleForm";
import { Statistic } from "antd";

const { Header, Content, Sider } = Layout;
const { Option } = Select;



const doctorColumns = (onEdit, onDelete) => [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
  { title: "Specialty", dataIndex: "specialty", key: "specialty" },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" onClick={() => onEdit(record)}>
          Edit
        </Button>
        <Button
          type="link"
          danger
          onClick={() =>
            Modal.confirm({
              title: "Are you sure delete this doctor?",
              onOk: () => onDelete(record._id),
            })
          }
        >
          Delete
        </Button>
      </Space>
    ),
  },
];

const Dashboard = ({ doctors }) => (
  <Card title="Dashboard">
    <Row gutter={16}>
      <Col span={8}>
        <Card bordered={false}>
          <Statistic
            title="Registered Doctors"
            value={doctors.length}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>
    </Row>
  </Card>
);

const ScheduleAppointment = () => (
  <Card title="Schedule Appointment">
    [Schedule Appointment Form Placeholder]
  </Card>
);
const AllAppointments = () => (
  <Card title="All Appointments">[Appointments List Placeholder]</Card>
);
const RegisterPatient = () => (
  <Card title="Register Patient">[Patient Registration Form Placeholder]</Card>
);
const RegisterStaff = () => (
  <Card title="Register Staff">[Staff Registration Form Placeholder]</Card>
);

const StaffHome = () => {
  const [selectedMenu, setSelectedMenu] = useState("registerDoctor");
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/doctor-auth");
      setDoctors(res.data.doctors );
      setLoading(false);
    } catch {
      setLoading(false);
      message.error("Failed to fetch doctors.");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const onFinish = async (values) => {
    try {
      await axios.post("http://localhost:8080/api/doctor-auth/register", values);
      message.success("Doctor registered successfully!");
      form.resetFields();
      fetchDoctors();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to register doctor."
      );
    }
  };

const onEdit = (doctor) => {
  console.log("Editing doctor:", doctor); // Add this for debugging
  if (!doctor || !doctor._id) {
    message.error("Invalid doctor data");
    return;
  }
  setEditingDoctor(doctor);
  editForm.setFieldsValue({ ...doctor });
  setIsEditModalVisible(true);
};

const onEditFinish = async (values) => {
  console.log("Submitting updated doctor:", values);
  try {
    await axios.put(
      `http://localhost:8080/api/doctor-auth/${editingDoctor._id}`,
      values
    );
    message.success("Doctor updated successfully!");
    setIsEditModalVisible(false);
    setEditingDoctor(null);
    fetchDoctors();
  } catch (error) {
    message.error(
      error.response?.data?.message || "Failed to update doctor."
    );
  }
};

  const onDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/doctor-auth/${id}`
      );
      alert(response.data.message);
      fetchDoctors();
    } catch (error) {
      alert("Failed to delete doctor");
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return <Dashboard doctors={doctors} />;
      case "schedule":
        return <ScheduleForm />;
      case "appointments":
        return <AllAppointments />;
      case "registerPatient":
        return <RegisterPatient />;
      case "registerDoctor":
        return (
          <>
            <Card title="Register New Doctor" style={{ marginBottom: 24 }}>
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: "Please enter full name" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="nic"
                  label="NIC"
                  rules={[{ required: true, message: "Please enter NIC" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: "Please enter password" }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="specialty"
                  label="Specialty"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="cosmetic">Cosmetic Dermatology</Option>
                    <Option value="acne">Acne & Scar Treatment</Option>
                    <Option value="surgical">Skin Cancer Screening</Option>
                    <Option value="pediatric">Pediatric Dermatology</Option>
                    <Option value="laser">Laser Treatment</Option>
                    <Option value="hair">Hair Restoration</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="degrees"
                  label="Degrees"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="experience"
                  label="Experience"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="notes" label="Notes">
                  <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item
                  name="image"
                  label="Doctor Image URL"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="rating"
                      label="Rating"
                      rules={[{ required: true }]}
                    >
                      <Input type="number" step={0.1} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="reviews"
                      label="Reviews"
                      rules={[{ required: true }]}
                    >
                      <Input type="String" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Register Doctor
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            <Card title="Doctors List">
              <Table
                columns={doctorColumns(onEdit, onDelete)}
                dataSource={doctors}
                loading={loading}
                rowKey={(record) => record._id}
                expandable={{
                  /* expandedRowRender: (record) => (
                    <Table
                      columns={scheduleColumns}
                      dataSource={record.schedule || []}
                      pagination={false}
                      rowKey={(scheduleItem) =>
                        scheduleItem.day + scheduleItem.time
                      }
                      size="small"
                    />
                  ), */
                  rowExpandable: (record) =>
                    record.schedule && record.schedule.length > 0,
                }}
              />
            </Card>
            <Modal
              open={isEditModalVisible}
              title="Edit Doctor"
              onCancel={() => setIsEditModalVisible(false)}
              footer={null}
              destroyOnClose
            >
              <Form form={editForm} layout="vertical" onFinish={onEditFinish}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please enter full name" },
                  ]}
                >
                  <Input placeholder="Full Name" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter valid email",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="nic"
                  label="NIC"
                  rules={[{ required: true, message: "Please enter NIC" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: "Please enter password" }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    { required: true, message: "Please enter phone number" },
                  ]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>

                <Form.Item
                  name="specialty"
                  label="Specialty"
                  rules={[
                    { required: true, message: "Please select specialty" },
                  ]}
                >
                  <Select placeholder="Select specialty">
                    <Option value="cosmetic">
                      Cosmetic Dermatology Specialist
                    </Option>
                    <Option value="acne">
                      Acne & Scar Treatment Specialist
                    </Option>
                    <Option value="surgical">
                      Skin Cancer Screening Specialist
                    </Option>
                    <Option value="pediatric">
                      Pediatric Dermatology Specialist
                    </Option>
                    <Option value="laser">Laser Treatment Specialist</Option>
                    <Option value="hair">Hair Restoration Specialist</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="degrees"
                  label="Degrees"
                  rules={[{ required: true, message: "Please enter degrees" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="experience"
                  label="Experience"
                  rules={[
                    { required: true, message: "Please enter experience" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="notes" label="Notes">
                  <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item
                  name="image"
                  label="Doctor Image URL"
                  rules={[
                    { required: true, message: "Please enter image URL" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="rating"
                      label="Rating"
                      rules={[
                        { required: true, message: "Enter rating (1.0 - 5.0)" },
                        { type: "number", min: 1, max: 5 },
                      ]}
                    >
                      <Input type="number" step={0.1} />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="reviews"
                      label="Reviews"
                      rules={[
                        { required: true, message: "Enter reviews" },
                      ]}
                    >
                      <Input type="String" />
                    </Form.Item>
                  </Col>
                </Row>

                {/* <Form.List name="schedule">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Row gutter={16} key={key} style={{ marginBottom: 12 }}>
                          <Col span={6}>
                            <Form.Item
                              {...restField}
                              name={[name, "day"]}
                              rules={[
                                { required: true, message: "Day required" },
                              ]}
                            >
                              <Select placeholder="Day">
                                <Option value="Monday">Monday</Option>
                                <Option value="Tuesday">Tuesday</Option>
                                <Option value="Wednesday">Wednesday</Option>
                                <Option value="Thursday">Thursday</Option>
                                <Option value="Friday">Friday</Option>
                                <Option value="Saturday">Saturday</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col span={10}>
                            <Form.Item
                              {...restField}
                              name={[name, "time"]}
                              rules={[
                                { required: true, message: "Time required" },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col span={6}>
                            <Form.Item
                              {...restField}
                              name={[name, "availability"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Availability status",
                                },
                              ]}
                            >
                              <Select placeholder="Availability">
                                <Option value="available">Available</Option>
                                <Option value="limited">Limited</Option>
                                <Option value="unavailable">Unavailable</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col span={2}>
                            <Button danger onClick={() => remove(name)}>
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block>
                          + Add Schedule
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List> */}

                <Form.Item>
                  <Space style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      onClick={() => {
                        setIsEditModalVisible(false);
                        setEditingDoctor(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Update Doctor
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>
          </>
        );
      case "registerStaff":
        return <RegisterStaff />;
      case "uploadReport":
        return <ReportUpload />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light" width={240}>
        <div
          style={{
            height: 64,
            textAlign: "center",
            padding: 16,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Admin Panel
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="schedule" icon={<CalendarOutlined />}>
            Schedule Appointment
          </Menu.Item>
          <Menu.Item key="appointments" icon={<ProfileOutlined />}>
            All Appointments
          </Menu.Item>
          <Menu.Item key="registerPatient" icon={<UserAddOutlined />}>
            Register Patient
          </Menu.Item>
          <Menu.Item key="registerDoctor" icon={<TeamOutlined />}>
            Register Doctor
          </Menu.Item>
          <Menu.Item key="registerStaff" icon={<UserAddOutlined />}>
            Register Staff
          </Menu.Item>
          <Menu.Item key="uploadReport" icon={<UploadOutlined />}>
            Upload Medical Report
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: "0 24px", fontSize: 20 }}>
          {selectedMenu
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Header>
        <Content style={{ margin: 24 }}>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default StaffHome;