import React, { useState } from "react";
import Header from "./frontend/components/Header";
import Login from "./frontend/components/Login";
import Registration from "./frontend/components/Registration";

import DoctorDashboard from "./frontend/doctor/DoctorDashboard";
import UserDashboard from "./frontend/user/UserDashboard";

import { isAuthenticated } from "./frontend/utils/auth";

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
