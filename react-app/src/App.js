 import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/demo', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
  }

  const getUsers = async () => {
    const response = await fetch('http://localhost:8080/demo', {
      method: 'GET',
    })
    const data = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
      <h1>LOGIN</h1>
      <div className='underline'></div>
        <label>Username</label>
        <input type="text" name="username" onChange={handleForm}></input>
        <label>Password</label>
        <input type="text" name="password" onChange={handleForm}></input>
        {/* <input type="submit"></input> */}
        <button>submit</button>
      </form>
      <div>
        <ul>
          {users.map(user => <li key={user._id}>{user.username},{user.password}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default App;





