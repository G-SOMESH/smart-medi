import React, { useState } from "react";
import { registerUser } from "../utils/auth";
import "./Registration.css";

export default function Registration({ goToLogin }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    username: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();

    // ✅ FIX: Send full form to registerUser()
    const ok = registerUser(form);

    if (!ok) {
      alert("Username already exists!");
      return;
    }

    alert("Registration successful! Please login.");
    goToLogin();
  }

  return (
    <div className="reg-bg">
      <div className="reg-card">
        <h2 className="reg-title">Create an Account</h2>

        <form onSubmit={submit} className="reg-form">
          <input type="text" name="fullName" placeholder="Full Name"
            value={form.fullName} onChange={handleChange} required />

          <input type="email" name="email" placeholder="Email ID"
            value={form.email} onChange={handleChange} required />

          <input type="text" name="phone" placeholder="Phone Number"
            value={form.phone} onChange={handleChange} required />

          <input type="number" name="age" placeholder="Age"
            value={form.age} onChange={handleChange} required />

          <select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <textarea name="address" placeholder="Address"
            value={form.address} onChange={handleChange} required />

          <input type="text" name="username" placeholder="Choose Username"
            value={form.username} onChange={handleChange} required />

          <input type="password" name="password" placeholder="Choose Password"
            value={form.password} onChange={handleChange} required />

          <button type="submit" className="reg-btn">Register</button>
        </form>

        <p className="reg-login-text">
          Already have an account?{" "}
          <button onClick={goToLogin} className="reg-link-btn">Login here</button>
        </p>
      </div>
    </div>
  );
}
