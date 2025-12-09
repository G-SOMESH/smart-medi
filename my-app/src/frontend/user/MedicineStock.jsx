import React, { useEffect, useState } from "react";
import { getStock, saveStock } from "../utils/storage";

export default function MedicineStock({ role, currentUser }) {
  const [stock, setStock] = useState([]);
  const [form, setForm] = useState({
    username: currentUser?.username || "user",
    name: "",
    currentQuantity: "",
    timePeriodDays: "",
    expiryDate: "",
    reminderTimes: [],
    newReminderTime: ""
  });

  useEffect(() => {
    loadStock();
  }, [currentUser]);

  function loadStock() {
    const all = getStock();
    if (currentUser) setStock(all.filter(s => s.username === currentUser.username));
    else setStock(all);
  }

  function addReminder() {
    const t = form.newReminderTime;
    if (!t) return;
    if (!/^\d{2}:\d{2}$/.test(t)) {
      alert("Reminder must be in HH:MM format");
      return;
    }
    setForm(prev => ({ ...prev, reminderTimes: [...prev.reminderTimes, t], newReminderTime: "" }));
  }

  function removeReminder(t) {
    setForm(prev => ({ ...prev, reminderTimes: prev.reminderTimes.filter(x => x !== t) }));
  }

  function submit(e) {
    e.preventDefault();
    if (form.reminderTimes.length === 0) {
      alert("Please add at least one reminder time (HH:MM).");
      return;
    }

    const entry = {
      ...form,
      id: Date.now(),
      currentQuantity: Number(form.currentQuantity),
      timePeriodDays: Number(form.timePeriodDays)
    };

    const all = getStock();
    saveStock([...all, entry]);

    setForm({
      username: currentUser?.username || "user",
      name: "",
      currentQuantity: "",
      timePeriodDays: "",
      expiryDate: "",
      reminderTimes: [],
      newReminderTime: ""
    });

    loadStock();
  }

  function del(id) {
    const all = getStock();
    saveStock(all.filter(s => s.id !== id));
    loadStock();
  }

  return (
    <div style={{ width: "100%", marginTop: 20 }}>

      {/* 🌟 CARD 1 — ADD MEDICINE */}
      <div className="card stock-card" style={{ padding: 20, marginBottom: 30 }}>
        <h3>Add Medicine to Stock</h3>

        <form onSubmit={submit} style={{ marginTop: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <input
              placeholder="Medicine Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Current Quantity"
              type="number"
              value={form.currentQuantity}
              onChange={e => setForm({ ...form, currentQuantity: e.target.value })}
            />

            <input
              placeholder="Time Period (days)"
              type="number"
              value={form.timePeriodDays}
              onChange={e => setForm({ ...form, timePeriodDays: e.target.value })}
            />

            <input
              placeholder="dd-mm-yyyy"
              type="date"
              value={form.expiryDate}
              onChange={e => setForm({ ...form, expiryDate: e.target.value })}
            />
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center" }}>
            <input
              type="time"
              value={form.newReminderTime}
              onChange={e => setForm({ ...form, newReminderTime: e.target.value })}
            />
            <button type="button" className="btn" onClick={addReminder}>
              Add Time
            </button>
          </div>

          {form.reminderTimes.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <div className="text-sm font-semibold">Reminder Times</div>
              <ul style={{ marginTop: 6 }}>
                {form.reminderTimes.map((t, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span>{t}</span>
                    <button
                      type="button"
                      className="btn small"
                      onClick={() => removeReminder(t)}
                      style={{ background: "transparent" }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <button
              type="button"
              className="btn"
              onClick={() =>
                setForm({
                  username: currentUser?.username || "user",
                  name: "",
                  currentQuantity: "",
                  timePeriodDays: "",
                  expiryDate: "",
                  reminderTimes: [],
                  newReminderTime: ""
                })
              }
            >
              Reset
            </button>
            <button type="submit" className="btn primary">
              Add Medicine
            </button>
          </div>
        </form>
      </div>

      {/* 🌟 CARD 2 — CURRENT STOCK */}
      <div className="card" style={{ padding: 20 }}>
        <h3>Current Stock</h3>

        <div style={{ marginTop: 12 }}>
          {stock.length === 0 ? (
            <p className="muted">No medicines in stock.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Qty</th>
                  <th>Period (days)</th>
                  <th>Expiry</th>
                  <th>Reminders</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stock.map(s => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.currentQuantity}</td>
                    <td>{s.timePeriodDays}</td>
                    <td>{s.expiryDate}</td>
                    <td>{(s.reminderTimes || []).join(", ")}</td>
                    <td>
                      <button className="btn small danger" onClick={() => del(s.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
