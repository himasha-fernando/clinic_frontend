import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Form, 
  Select, 
  InputNumber, 
  DatePicker, 
  TimePicker, 
  Button, 
  Card, 
  message,
  Row, 
  Col,
  Typography,
  Spin
} from 'antd';
import moment from 'moment';

const { Title } = Typography;
const { Option } = Select;

const AdminScheduleForm = () => {
  const [form] = Form.useForm();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingDoctors, setFetchingDoctors] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/doctor-auth');
        setDoctors(res.data.doctors);
      } catch (err) {
        message.error('Failed to fetch doctors');
        console.error('Error fetching doctors:', err);
      } finally {
        setFetchingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formattedData = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        startTime: values.startTime.format('HH:mm'),
        endTime: values.endTime.format('HH:mm')
      };
      
      await axios.post('http://localhost:8080/api/schedule', formattedData);
      message.success('Schedule created successfully!');
      form.resetFields();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to create schedule');
      console.error('Error creating schedule:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  if (fetchingDoctors) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card 
      style={{ 
        maxWidth: 800, 
        margin: '20px auto',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
        Doctor Scheduling Form
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ slotCount: 1 }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="doctorName"
              label="Doctor"
              rules={[{ required: true, message: 'Please select a doctor' }]}
            >
              <Select
                showSearch
                placeholder="Select doctor"
                optionFilterProp="children"
                filterOption={filterOption}
              >
                {doctors.map(doctor => (
                  <Option 
                    key={`${doctor._id}`} 
                    value={`${doctor.name} `}
                  >
                    {doctor.name} 
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="specialty"
              label="Specialty"
              rules={[{ required: true, message: 'Please select a specialty' }]}
            >
              <Select placeholder="Select specialty">
                {[...new Set(doctors.map(doc => doc.specialty))].map(spec => (
                  <Option key={spec} value={spec}>
                    {spec}
                  </Option>
                ))}
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
              <DatePicker 
                style={{ width: '100%' }}
                disabledDate={current => current && current < moment().startOf('day')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="slotCount"
              label="Number of Slots"
              rules={[{ 
                required: true, 
                message: 'Please enter number of slots',
                type: 'number',
                min: 1,
                max: 20
              }]}
            >
              <InputNumber 
                style={{ width: '100%' }}
                min={1}
                max={20}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="startTime"
              label="Start Time"
              rules={[{ required: true, message: 'Please select start time' }]}
            >
              <TimePicker 
                style={{ width: '100%' }}
                format="HH:mm"
                minuteStep={15}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="endTime"
              label="End Time"
              rules={[{ 
                required: true, 
                message: 'Please select end time',
                validator: (_, value) => {
                  const startTime = form.getFieldValue('startTime');
                  if (startTime && value && value.isBefore(startTime)) {
                    return Promise.reject('End time must be after start time');
                  }
                  return Promise.resolve();
                }
              }]}
            >
              <TimePicker 
                style={{ width: '100%' }}
                format="HH:mm"
                minuteStep={15}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: 32, textAlign: 'center' }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large"
            loading={loading}
            style={{ 
              width: '50%',
              height: 40,
              fontSize: 16
            }}
          >
            Create Schedule
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AdminScheduleForm;