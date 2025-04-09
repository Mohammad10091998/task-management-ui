import RegisterForm from '../components/Auth/RegisterForm';

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f3f4f6', // light gray
};

const Register = () => {
  return (
    <div style={containerStyle}>
      <RegisterForm />
    </div>
  );
};

export default Register;
