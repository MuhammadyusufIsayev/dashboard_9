import { Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    dispatch(login(values))
      .unwrap()
      .then((response) => {
        console.log('Login successful:', response);
        navigate('/dashboard');
      })
      .catch((err) => {
        console.error('Login error:', err); 
        message.error(err.message || 'Login failed');
      });
  };
  

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '50px' }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
        <p style={{ textAlign: 'center' }}>
          Dont have an account? <Link to="/register">Register here</Link>
        </p>
      </Form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default Login;
