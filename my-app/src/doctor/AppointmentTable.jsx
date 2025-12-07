import React, { useEffect, useState } from "react";
import { getAppointments, saveAppointments } from "../utils/storage";
import "./AppointmentTable.css";

export default function AppointmentTable({ role }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  function approve(id) {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: "approved" } : a
    );
    setAppointments(updated);
    saveAppointments(updated);
  }

  function reject(id) {
    const updated = appointments.map((a) =>
      a.id === id ? { ...a, status: "rejected" } : a
    );
    setAppointments(updated);
    saveAppointments(updated);
  }

  function deleteAppt(id) {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    saveAppointments(updated);
  }

  return (
    <div className="admin-card">
      <h3 className="table-title">All Appointments</h3>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Appt ID</th>
            <th>Verified</th>
            {role === "doctor" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>

              <td>
                <span
                  className={
                    a.status === "approved"
                      ? "status-badge approved"
                      : a.status === "pending"
                      ? "status-badge pending"
                      : "status-badge rejected"
                  }
                >
                  {a.status}
                </span>
              </td>

              <td>{a.apptId || "N/A"}</td>
              <td>{a.verified ? "Yes" : "No"}</td>

              {role === "doctor" && (
                <td className="action-buttons">
                  {a.status === "pending" && (
                    <>
                      <button className="approve-btn" onClick={() => approve(a.id)}>
                        Approve
                      </button>
                      <button className="reject-btn" onClick={() => reject(a.id)}>
                        Reject
                      </button>
                    </>
                  )}

                  <button className="delete-btn" onClick={() => deleteAppt(a.id)}>
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
