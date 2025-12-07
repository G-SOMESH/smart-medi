import React, { useState } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Registration from "./components/Registration";

import DoctorDashboard from "./doctor/DoctorDashboard";
import UserDashboard from "./user/UserDashboard";

import { isAuthenticated } from "./utils/auth";

export default function App() {
  const [user, setUser] = useState(isAuthenticated());
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div>
      <Header user={user} setUser={setUser} />

      {!user ? (
        showRegistration ? (
          <Registration goToLogin={() => setShowRegistration(false)} />
        ) : (
          <Login
            setUser={setUser}
            goToRegister={() => setShowRegistration(true)}
          />
        )
      ) : user.role === "doctor" ? (
        <DoctorDashboard user={user} />
      ) : (
        <UserDashboard user={user} />
      )}
    </div>
  );
}
