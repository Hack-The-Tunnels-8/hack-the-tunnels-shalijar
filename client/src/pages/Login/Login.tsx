import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components";
import { useAccountContext } from "../../context";
import "./Login.style.scss";

function Login() {
  const [email, setEmail] = useState(""); // Add email state
  const [password, setPassword] = useState(""); // Add password state
  const [message, setMessage] = useState(null);
  const { loggedIn, login } = useAccountContext();
  const navigate = useNavigate();

  const attemptLogin = async () => {
    try {
      const message = await login(email, password); 
      setMessage(message);
    } catch (error) {
      console.log(error);
      setMessage("Invalid credentials. Please try again."); 
    } // Add the missing closing curly brace here
  };

  useEffect(() => {
    if (loggedIn() === true) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <Page>
      <div className="login-page">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        <button onClick={() => attemptLogin()}>Login</button>
        {message && <p className="error-message">{message}</p>}
      </div>
    </Page>
  );
}

export default Login;
