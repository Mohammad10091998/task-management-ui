import LoginForm from '../components/Auth/LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#eff6ff', // light blue
};

const Login = () => {
  return (
    <div style={containerStyle}>
      <LoginForm />
      <ToastContainer />
    </div>
  );
};

export default Login;
