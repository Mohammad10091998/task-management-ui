import { useState } from 'react';
import { loginUser } from "../../services/authService";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      toast.error("Invalid email or password", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f4f8",
          padding: "1rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              marginBottom: "1.5rem",
              color: "#1e3a8a",
              fontWeight: "600",
            }}
          >
            Sign in to your account
          </h2>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "1rem" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                  color: "#1e293b",
                }}
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "4px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.95rem",
                  color: "#0f172a",
                }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                  color: "#1e293b",
                }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                style={{
                  width: "100%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "4px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.95rem",
                  color: "#0f172a",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.6rem",
                backgroundColor: loading ? "#93c5fd" : "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                transition: "background-color 0.2s",
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      border: "2px solid #fff",
                      borderTop: "2px solid #2563eb",
                      borderRadius: "50%",
                      width: "16px",
                      height: "16px",
                      animation: "spin 1s linear infinite",
                    }}
                  ></span>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#64748b",
            }}
          >
            Not a member?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                fontWeight: "600",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Register now
            </button>
          </p>
        </div>
      </div>

      <ToastContainer />

      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default LoginForm;
