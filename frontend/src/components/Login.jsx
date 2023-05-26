import React, { useState } from "react";
import axios from "axios";
import Profile from "./Profile";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8000/api/login", credentials)
      .then((response) => {
        if (response.data.success) {
          setMessage("Login Successful");
          setLoggedIn(true);
          setName(response.data.name);
        } else {
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        console.error("Error:", error);
      });
  };

  if (loggedIn) {
    return <Profile name={name} />;
  }

  return (
    <div>
      <div>
        <h1>Login Page</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
