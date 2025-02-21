import React, { useState } from "react";
import "./App/App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(g\.ucla\edu|ucla\.edu)$/;
    if(!emailPattern.test(email)){
        alert("email must include a @g.ucla.edu or a @ucla.edu");
        return;
    }

    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if(!passwordPattern.test(password)){
        alert("password must be 8 characters with one number and symbol.")
    }
    console.log(email, password);
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <h4> to make a login, you must have a @ucla account and password must be of length 8 with One capital letter, one number, and one special character.</h4>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;