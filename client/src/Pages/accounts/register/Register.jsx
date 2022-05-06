import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

export default function Register() {

  const [credentials, setcredentials] = useState({ username: "", email: "", password: "" });

  let navigate = useNavigate();

  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/register", credentials);
      navigate('/accounts/login');
      // setcredentials({ username: "", email: "", password: "" });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="Logo">MemeBook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Username" className="loginInput" name="username" value={credentials.username} onChange={handleChange} />
            <input placeholder="Email" className="loginInput" name="email" value={credentials.email} onChange={handleChange} />
            <input type="password" placeholder="Password" className="loginInput" name="password" value={credentials.password} onChange={handleChange} />
            <input type="password" placeholder="Password Again" className="loginInput" />
            <button className="loginButton" onClick={handleSubmit}>Sign Up</button>
            <Link to="/accounts/login" className="link">
              <button className="loginRegisterButton">
                Log into Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
