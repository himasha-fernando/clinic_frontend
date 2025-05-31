import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Card } from "antd";
import axios from "axios";

const DoctorListForm = ({ onEdit }) => {
  const [doctors, setDoctors] = useState([]);

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      message.error("Failed to load doctors");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Delete a doctor
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/doctors/${id}`);
      message.success("Doctor deleted");
      fetchDoctors();
    } catch (err) {
      message.error("Failed to delete doctor");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "firstName",
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => onEdit(record)} // Pass data to registration form for editing
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this doctor?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Card title="All Registered Doctors" style={{ marginTop: "24px" }}>
      <Table rowKey="_id" dataSource={doctors} columns={columns} />
    </Card>
  );
};

export default DoctorListForm;
