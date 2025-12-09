import React, { useEffect, useState } from "react";
import { getAppointments, saveAppointments } from "../utils/storage";
import "./slider.css";

export default function AppointmentSlider({ open, onClose, currentUser }) {
  const [heightClass, setHeightClass] = useState(open ? "open" : "closed");

  const initForm = {
    username: currentUser?.username || "",
    patientName: currentUser?.username || "",
    phoneNumber: "",
    email: "",
    department: "",
    gender: "",
    date: "",
    time: "",
    symptoms: ""
  };

  const [form, setForm] = useState(initForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setHeightClass(open ? "open" : "closed");
    if (open) setForm(initForm);
  }, [open]);

  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(e) {
    e.preventDefault();

    if (form.date < today) {
      alert("You cannot select a past date!");
      return;
    }

    setSubmitting(true);

    const all = getAppointments();
    const newApp = {
      id: Date.now(),
      appointmentId: null,
      username: form.username,
      patientName: form.patientName,
      phoneNumber: form.phoneNumber,
      email: form.email,
      department: form.department,
      gender: form.gender,
      date: form.date,
      time: form.time,
      symptoms: form.symptoms,
      status: "pending",
      verified: false,
      createdAt: new Date().toISOString()
    };

    saveAppointments([...all, newApp]);
    window.dispatchEvent(new Event("appointments-updated"));

    setTimeout(() => {
      setSubmitting(false);
      onClose && onClose();
    }, 300);
  }

  return (
    <div className={`slider-panel ${heightClass}`}>
      <div className="slider-inner">
        <div className="slider-head" style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Book Appointment</h3>
          <button className="btn" onClick={onClose}>Close</button>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
          <label>Patient Name</label>
          <input
            required
            value={form.patientName}
            onChange={(e) => setForm({ ...form, patientName: e.target.value })}
          />

          <label>Phone Number</label>
          <input
            required
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />

          <label>Email ID</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label>Specialist</label>
          <select
            required
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          >
            <option value="">Select Department</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Pediatrics</option>
            <option>Orthopedics</option>
          </select>

          <label>Gender</label>
          <select
            required
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label>Select Date</label>
          <input
            required
            type="date"
            min={today}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <label>Time</label>
          <input
            required
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />

          <label>Symptoms</label>
          <textarea
            required
            value={form.symptoms}
            onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
          />

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
            <button type="submit" className="btn primary" disabled={submitting}>
              {submitting ? "Booking..." : "Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
