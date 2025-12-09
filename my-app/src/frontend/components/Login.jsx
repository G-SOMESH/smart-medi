import React, { useState } from "react";
import { login } from "../utils/auth";
import "./Login.css";

export default function Login({ setUser, goToRegister }) {
  const [form, setForm] = useState({ username: "", password: "" });

  function submit(e) {
    e.preventDefault();
    const u = login(form.username, form.password);

    if (u) {
      setUser(u);
    } else {
      alert("Invalid username or password");
    }
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <form onSubmit={submit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="login-link-text">
          New user?{" "}
          <button onClick={goToRegister} className="login-link-btn">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}
