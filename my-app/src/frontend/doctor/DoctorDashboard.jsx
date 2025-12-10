import React from "react";
import AppointmentTable from "./AppointmentTable";

export default function DoctorDashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <AppointmentTable role="doctor" />
    </div>
  );
}
