import React, { useState, useEffect } from "react";
import AppointmentTable from "./AppointmentTable";
import AppointmentSlider from "./AppointmentSlider";
import MedicineStock from "./MedicineStock";

export default function UserDashboard({ user }) {
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  return (
    <div style={{ padding: "20px" }}>

      {/* TOP CARD AREA */}
      <div className="card" style={{ padding: 20, display: "flex", alignItems: "center" }}>
        <img
          src="https://i.ibb.co/pj4WXSLs/Screenshot-2025-05-06-201313.png"
          alt=""
          style={{ width: 180, borderRadius: 10, marginRight: 20 }}
        />

        <div>
          <h2>Welcome, {user.username}</h2>
          <p>Manage appointments, medicines and reminders from here.</p>
        </div>

        <button
          className="primary-btn"
          style={{ marginLeft: "auto" }}
          onClick={() => setIsSliderOpen(true)}
        >
          Book Appointment
        </button>
      </div>

      {/* SLIDER COMES HERE */}
      <AppointmentSlider
        open={isSliderOpen}
        onClose={() => setIsSliderOpen(false)}
        currentUser={user}
      />

      {/* APPOINTMENTS TABLE */}
      <AppointmentTable username={user.username} />
      <MedicineStock username={user.username}/>
    </div>
  );
}
