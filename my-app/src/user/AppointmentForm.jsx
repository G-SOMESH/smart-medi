import React, { useState } from "react";
import { saveAppointments, getAppointments, generateAppointmentId } from "../utils/storage";

export default function AppointmentForm({ closeForm, currentUser }) {
  const [form, setForm] = useState({
    name: currentUser?.username || "",
    email: "",
    gender: "",
    phone: "",
    department: "",
    date: "",
    time: "",
    symptoms: ""
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    if (
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.gender ||
      !form.department ||
      !form.date ||
      !form.time ||
      !form.symptoms
    ) {
      alert("Fill all fields");
      return;
    }

    if (form.date < today) {
      alert("Past dates not allowed");
      return;
    }

    const all = getAppointments();

    const newAppointment = {
      id: generateAppointmentId(),
      username: currentUser?.username || form.name,
      patientName: form.name,
      phone: form.phone,
      email: form.email,
      gender: form.gender,
      department: form.department,
      date: form.date,
      time: form.time,
      symptoms: form.symptoms,
      status: "pending",
      appointmentId: null,
      createdAt: new Date().toISOString()
    };

    saveAppointments([...all, newAppointment]);

// ✅ FORCE TABLE UPDATE
window.dispatchEvent(new Event("appointments-updated"));

closeForm();
  };

  return (
    <div className="appt-form">
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />

      <select name="gender" onChange={handleChange}>
        <option value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <select name="department" onChange={handleChange}>
        <option value="">Department</option>
        <option>General</option>
        <option>Orthopedic</option>
      </select>

      <input type="date" name="date" min={today} onChange={handleChange} />
      <input type="time" name="time" onChange={handleChange} />

      <textarea name="symptoms" placeholder="Symptoms" onChange={handleChange} />

      <button onClick={submit}>Book</button>
    </div>
  );
}
