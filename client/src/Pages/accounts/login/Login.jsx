import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import "./login.css";

export default function Login() {

  const [credentials, setcredentials] = useState({ email: "", password: "" })

  let navigate = useNavigate()

  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      let response = await axios.post("http://localhost:8000/api/auth/login", credentials);
      if (response.data.success) {
        localStorage.setItem('token', response.data.authtoken);
        navigate("/");
      }
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
            <input placeholder="Email" className="loginInput" name="email" value={credentials.email} onChange={handleChange} />
            <input type="password" placeholder="Password" className="loginInput" name="password" value={credentials.password} onChange={handleChange} />
            <button className="loginButton" onClick={handleSubmit}>Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/accounts/register" className="link">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
