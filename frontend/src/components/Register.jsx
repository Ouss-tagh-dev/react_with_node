import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [message, setMessage] = useState("");

  const sbm = (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && psw !== "") {
      const newUser = {
        name: name,
        email: email,
        password: psw,
      };

      axios
        .post("http://localhost:8000/api/register", newUser)
        .then((response) => {
          if (response.data.success) {
            setMessage("User created successfully");
          } else {
            setMessage(response.data.error);
          }
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            setMessage(error.response.data.error);
          } else {
            setMessage("An error occurred");
          }
        });
    } else {
      setMessage("User creation unsuccessful");
    }
  };

  return (
    <div>
      <div>
        <h1>Register Page</h1>
      </div>
      <form onSubmit={sbm}>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="password"
            onChange={(e) => {
              setPsw(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
