import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Log = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      const response = await axios.post("/login", { username, password });
      console.log(response.data);
      if (response.data.credit === "true") {
        navigate(`/Credit?username=${username}`);
      } else if (response.data.credit === "false") {
        navigate(`/debit?username=${username}`);
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data || "An error occurred";
        setError(errorMessage);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Log;
