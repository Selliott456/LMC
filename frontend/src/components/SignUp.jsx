import React, { useEffect, useState } from 'react'
import axios from 'axios'

function SignUp(props) {
  const [formData, updateFormData] = useState({
    username: "",
	  email: "",
	  password: ""
  })
  const [errors, updateErrors] = useState({
    username: "",
	  email: "",
	  password: ""
  })


  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value
    const data = {
      ...formData,
      [name]: value
    }

  const newErrors = {
    ...errors,
    [name]:''
  }

  updateFormData(data)
  updateErrors(newErrors)
}

function handleSubmit(event) {
  event.preventDefault()
  axios.post()('localhost:5000/signup', formData)
    .then(res => {
      if (res.data.errors) {
        updateErrors(res.data.errors)
      } else {
        props.history.push('/')
      }
    })
}

return <div className="signUp" role="main">
  <h1>Sign Up</h1>
  <form onSubmit={handleSubmit}>
    <label>Username</label>
    <input 
    type="text"
    onChange={handleChange}
    value={formData.username}
    name="username"
    />
    <label>email</label>
    <input 
      type="text"
      onChange={handleChange}
      value={formData.email}
      name="email"
    />
    <label>Password</label>
    <input
      type="password"
      onChange={handleChange}
      value={formData.password}
      name="password"
    />
    <button>Submit</button>
  </form>
</div>
}

export default SignUp