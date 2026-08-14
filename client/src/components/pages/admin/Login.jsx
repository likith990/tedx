import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { pingServer } from "../../../api/client";
import "./Login.css";

export default function Login() {
  const { login, error, loading, isAuthed } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    pingServer();
  }, []);

  useEffect(() => {
    if (isAuthed) navigate("/admin", { replace: true });
  }, [isAuthed, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) navigate("/admin", { replace: true });
  }

  return (
    <div className="admin-login">
      <form className="admin-login__form" onSubmit={handleSubmit}>
        <p className="eyebrow">Admin</p>
        <h1>Log in</h1>

        {loading && (
          <p className="admin-login__hint">
            Connecting to server, can take up to a minute if idle.
          </p>
        )}

        {error && <p className="admin-login__error">{error}</p>}

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
    </div>
  );
}