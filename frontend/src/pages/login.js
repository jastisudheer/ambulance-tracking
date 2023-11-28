import React, { useState } from "react";
import Userlogin from "../helpers/login";
import { useNavigate } from "react-router-dom";
import '../css/login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, path } = Userlogin();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  path && navigate(`${path}`);

  return (
    <div>
      <header>
        <h1>Ambulance Tracking System</h1>
      </header>
      <div className="login-container">
        <div className="login">
          <form>
            <label htmlFor="Email" className="e-mail-label login-label">
              Email:
            </label>
            <input
              type="email"
              id="Email"
              name="email"
              placeholder="Example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="password-label login-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={(e) => handleSubmit(e)}>Submit</button>
            {/* <input type="submit" 
                        onClick={()=>handleSubmit()}
                        className="submitt-btn btn" /> */}
          </form>
        </div>
      </div>
      <p>{password}</p> {/* Displaying password; usually not recommended */}
    </div>
  );
};

export default Login;