import React, { useEffect, useState } from "react";
import { getAppointments } from "../utils/storage";

export default function AppointmentTable({ currentUser }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    load();

    function refresh() {
      load();
    }

    window.addEventListener("storage", refresh);
    window.addEventListener("appointments-updated", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("appointments-updated", refresh);
    };
  }, [currentUser]);

  function load() {
    const all = getAppointments();

    // ✅ FAIL-SAFE FILTER
    if (currentUser?.username) {
      const filtered = all.filter(
        (a) => a.username === currentUser.username
      );
      setAppointments(filtered.length ? filtered : all); // ✅ NEVER EMPTY BY MISTAKE
    } else {
      setAppointments(all);
    }
  }

  return (
    <div className="card table-card">
      <h3>My Appointments</h3>

      <table className="appt-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Appt ID</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan={5}>No appointments yet</td>
            </tr>
          ) : (
            appointments.map((a) => (
              <tr key={a.id}>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.status}</td>
                <td>{a.appointmentId || "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
