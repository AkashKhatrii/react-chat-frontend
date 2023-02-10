import React, { useState } from "react";
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc } from "firebase/firestore"; 

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // axios.post('http://localhost:8080/login', { email: email, password : password})
    // .then(res => console.log(res))
    // .catch(err => console.log(err));


    try {
      axios.post(
        'https://react-chat-backend.onrender.com/login',  { email: email, password : password}, 
        {
          withCredentials: true,
        }
      ).then(async res => {
        navigate("/chat")
      }).catch(err => console.log(err))
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-2 bg-gray-400 rounded-md w-1/4">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        
          <label htmlFor="email" className="mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none py-1 px-2 mb-2 rounded-sm"
          ></input>
          

          

          <label htmlFor="password" className="mb-2">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none py-1 px-2 mb-2 rounded-sm"
          ></input>
          

          <button type="submit" className="py-2 px-4 bg-green-400 text-white rounded-md mt-2 w-max m-auto">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
