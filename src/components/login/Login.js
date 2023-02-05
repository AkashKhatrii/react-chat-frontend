import React, { useState } from "react";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/login', { email: email, password : password})
    .then(res => console.log(res))
    .catch(err => console.log(err));

  }
  return (
    <div className="login">
      <div className="login__wrapper">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
