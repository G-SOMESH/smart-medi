// Doctor default login
const defaultUsers = {
  doctor: { password: "doctor123", role: "doctor" },
};

// ===============================
// REGISTER USER
// ===============================

export function registerUser(userData) {
  let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

  // Check if username exists
  if (users.find((u) => u.username === userData.username)) {
    return false;
  }

  // Save user
  users.push({
    ...userData,
    role: "user",
  });

  localStorage.setItem("registeredUsers", JSON.stringify(users));
  return true;
}

// ===============================
// LOGIN
// ===============================

export function login(username, password) {
  // Doctor login
  if (defaultUsers[username] && defaultUsers[username].password === password) {
    const loggedUser = { username, role: "doctor" };
    localStorage.setItem("auth", JSON.stringify(loggedUser));
    return loggedUser;
  }

  // User login
  let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

  const found = users.find(
    (u) => u.username === username && u.password === password
  );

  if (found) {
    const loggedUser = { username, role: "user" };
    localStorage.setItem("auth", JSON.stringify(loggedUser));
    return loggedUser;
  }

  return null;
}

// ===============================
// AUTH HELPERS
// ===============================

export function logout() {
  localStorage.removeItem("auth");
}

export function isAuthenticated() {
  return JSON.parse(localStorage.getItem("auth"));
}
