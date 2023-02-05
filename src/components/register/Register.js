import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const Register = () => {

    const [firstName, setfirstName] = useState();
    const [lastName, setlastName] = useState();
    const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/register', { firstName, lastName, email, password })
    .then(res => console.log(res))
    .catch(err => console.log(err));

  }
  return (
    <div className='register'>
    <div className='register__wrapper'>
        <form onSubmit={handleSubmit}>

        <label htmlFor='firstName'>First name</label>
            <input type='firstName' id='firstName' name='firstName' value={firstName} onChange={e => setfirstName(e.target.value)}></input>

            <label htmlFor='lastName'>Last name</label>
            <input type='lastName' name='lastName' id='lastName' value={lastName} onChange={e => setlastName(e.target.value)}></input>


            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' value={email} onChange={e => setEmail(e.target.value)}></input>

            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)}></input>

            <button type='submit'>Submit</button>
        </form>
    </div>
    </div>
  )
}

export default Register
