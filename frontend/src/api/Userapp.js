// import { API } from "../../config";

let API = "http://localhost:5001/api";
export const register = (user) => {
  return fetch(`${API}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
//login

export const login = (email, password) => {
  //   console.log(API);
  return fetch(`${API}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',// This ensures cookies are sent with the request
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// export const login = async (email, password) => {
//   return await fetch(`${API}/user/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include", // Ensures cookies are sent with the request
//     body: JSON.stringify({ email, password }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Data received:", data);
//       localStorage.setItem("jwt", JSON.stringify(data));
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };

//forgot password

export const forgotpassword = (email) => {
  return fetch(`${API}/user/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
    credentials: "include",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
//reset password
export const resetPassword = (token, password) => {
  return fetch(`${API}/user/reset-password/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
    credentials: "include",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

//verify email

export const verifyEmail = (code) => {
  return fetch(`${API}/user/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
    credentials: "include",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// logged in user's data fetch and token verification is done in the backend
export const authenticate = () => {
  return fetch(`${API}/user/check-auth`, {
    method: "GET", 
    credentials: "include", // This ensures cookies are sent with the request
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch authentication status");
      }
      return response.json()
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
// to check if logged in
// export const isAuthenticate = () => {
//   if (localStorage.getItem("jwt")) {
//     return JSON.parse(localStorage.getItem("jwt"));
//   } else {
//     return false;
//   }
// };

export const logout = async () => {
  try {
    const response = await fetch(`${API}/user/logout`, {
      method: "POST",
      credentials: "include", // This ensures cookies are sent with the request
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Logout failed");
    }

    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("Logout Error:", error.message);
    return { success: false, message: error.message };
  }
};