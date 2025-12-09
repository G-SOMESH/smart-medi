// ✅ STORAGE KEYS
const APPOINTMENT_KEY = "smartmedi_appointments_v1";
const STOCK_KEY = "smartmedi_medicine_stock_v1";

// ===============================
// ✅ APPOINTMENT STORAGE
// ===============================

export function getAppointments() {
  try {
    const raw = localStorage.getItem(APPOINTMENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAppointments(arr) {
  try {
    localStorage.setItem(APPOINTMENT_KEY, JSON.stringify(arr));
    // ✅ Force same tab update
    window.dispatchEvent(new Event("storage"));
  } catch {}
}

export function generateAppointmentId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

// ===============================
// ✅ MEDICINE STOCK STORAGE ✅✅✅
// ===============================

export function getStock() {
  try {
    const raw = localStorage.getItem(STOCK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStock(arr) {
  try {
    localStorage.setItem(STOCK_KEY, JSON.stringify(arr));
    window.dispatchEvent(new Event("storage"));
  } catch {}
}
