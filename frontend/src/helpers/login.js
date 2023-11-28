import axios from "axios";
import { useState } from "react";

const Userlogin = () => {
  const [path, setPath] = useState();
  // Assume a default path for redirection after logout
  const defaultPath = "/"; // Adjust this based on your routing

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:4000/api/user", {
        email,
        password,
      });
      setPath(response.data.page);
      console.log(response.data.page);
      // Here you might also want to store user data or token if provided
    } catch (error) {
      console.error("Error sending data", error);
    }
  };

  const logout = () => {
    // Clear any stored user data or authentication token
    // For example, if using localStorage: localStorage.removeItem('userToken');
    setPath(defaultPath);
  };

  return { login, logout, path };
};

export default Userlogin;
