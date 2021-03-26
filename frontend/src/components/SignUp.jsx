import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App(props) {
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
}

export default App