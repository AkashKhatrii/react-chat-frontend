import React from "react";
import { useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("https://react-chat-backend.onrender.com/register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then(async (res) => {
        await setDoc(doc(db, "users", res.data.data._id), {
          uid: res.data.data._id,
          displayName: res.data.data.firstName,
          email,
        });

        await setDoc(doc(db, "userChats", res.data.data._id), {});

        navigate("/login");
      })
      .catch((err) => console.log(err));

    // const fb_user = await createUserWithEmailAndPassword(auth, email, password)
    // console.log("fb_user", fb_user)
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-2 bg-gray-400 rounded-md w-1/4">
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
        
          <label htmlFor="firstName" className="mb-2">
            First name
          </label>
          <input
            type="firstName"
            id="firstName"
            name="firstName"
            className="outline-none py-1 px-2 mb-2 rounded-sm"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          ></input>

          <label htmlFor="lastName" className="mb-2">Last name</label>
          <input
            type="lastName"
            name="lastName"
            id="lastName"
            className="outline-none py-1 px-2 mb-2 rounded-sm"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          ></input>

          <label htmlFor="email" className="mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="outline-none py-1 px-2 mb-2 rounded-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label htmlFor="password" className="mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="outline-none py-1 px-2 mb-2 rounded-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button type="submit" className="py-2 px-4 bg-green-400 text-white rounded-md mt-2 w-max m-auto">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
