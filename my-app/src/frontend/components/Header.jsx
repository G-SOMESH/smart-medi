import React from "react";
import { logout } from "../utils/auth";

export default function Header({ user, setUser }) {
  return (
    <header
      className="header"
      style={{
        width: "100%",
        background: "#17398A",
        padding: "20px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        borderRadius: "8px 8px 0 0"
      }}
    >
      {/* Left Logo Section */}
      <div className="logo">
        <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "700" }}>Smart Medi</h1>
        <p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>
          Smart Medical Intelligence System — demo
        </p>
      </div>

      {/* Right Side Auth Info */}
      <div
        className="auth-status"
        style={{ display: "flex", alignItems: "center", gap: "15px", fontSize: "16px" }}
      >
        {user ? (
          <>
            <span>
              Signed in: <b>{user.username}</b> ({user.role})
            </span>

            <button
              className="logout-btn"
              onClick={() => {
                logout();
                setUser(null);
              }}
              style={{
                background: "#E63946",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "500"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <span>Not signed in</span>
        )}
      </div>
    </header>
  );
}
