import { Page } from "../../components";
import React, { useState } from "react";
import { ServiceAPI } from "../../infrastructure";
import "./SignUp.style.scss";


function SignUp() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [message, setMessage] = useState(""); // State for error message

  const handleSignUp = async () => {
    const response = await ServiceAPI.signUp(email, password);

    if (response.error) {
      setMessage("Email is already in use. Please use a different email.");
    } else {
      setMessage("Created!");

    }
  };

  return (
    <Page>
      <div className="signup-page">
        <h1>Sign Up</h1>
        <div className="form-container">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
          {message && <p className="error-message">{message}</p>}
        </div>
      </div>
    </Page>
  );
}

export default SignUp;
