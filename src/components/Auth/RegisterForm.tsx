import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../../services/authService";
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({ email, password });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed", err);
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f4f8',
        padding: '1rem',
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            textAlign: 'center',
            color: '#1e3a8a',
          }}
        >
          Register
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            marginBottom: '1rem',
            borderRadius: '4px',
            border: '1px solid #cbd5e1',
            fontSize: '0.95rem',
            color: '#0f172a',
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            marginBottom: '1.5rem',
            borderRadius: '4px',
            border: '1px solid #cbd5e1',
            fontSize: '0.95rem',
            color: '#0f172a',
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.6rem',
            backgroundColor: loading ? '#93c5fd' : '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '0.75rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'background-color 0.2s',
          }}
        >
          {loading ? (
            <>
              <span className="spinner" style={{
                border: '2px solid #fff',
                borderTop: '2px solid #2563eb',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                animation: 'spin 1s linear infinite'
              }}></span>
              Registering...
            </>
          ) : (
            'Register'
          )}
        </button>

        <p
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            fontSize: "0.875rem",
            color: "#64748b",
          }}
        >
          Already a member?{' '}
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              background: "none",
              border: "none",
              color: "#2563eb",
              fontWeight: "600",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Sign in now
          </button>
        </p>
      </form>

      {/* Spinner animation style */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default RegisterForm;
