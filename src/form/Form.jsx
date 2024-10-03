


import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";

const Form = () => {
  const navigate = useNavigate();
  const url = "http://localhost:5001/Users"; 
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [error, setError] = useState({
    userNameError: '',
    emailError: '',
    passwordError: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (name === "name" && value.trim() !== "") {
      setError((prev) => ({ ...prev, userNameError: "" }));
    }
    if (name === "email" && validateEmail(value)) {
      setError((prev) => ({ ...prev, emailError: "" }));
    }
    if (name === "password" && value.length >= 6) {
      setError((prev) => ({ ...prev, passwordError: "" }));
    }
  };

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  const validations = () => {
    let isValid = true;
   let newError = {
    userNameError:'',
    email:'',
    password:'',
   }

    if (user.name.trim() === '') {
      newError.userNameError = "UserName is required.";
     isValid = false;
    }

    if (!validateEmail(user.email)) {
      newError.emailError = "Invalid email.";
      isValid = false;
    }

    if (!validatePassword(user.password)) {
      newError.passwordError = "Password must be at least 8 characters long and include at least one number.";
      isValid = false;
    }
    
    setError(newError);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validations()) {
      axios.post(url, {
        userName: user.name,
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        console.log("Response:", response);
        console.log("Data:", response.data);
        setUser({
          name: '',
          password: '',
          email: ''
        });
        navigate('/');
      })
      .catch((error) => {
        console.error("There was an error posting the data!", error);
      });
    }
  };

  return (
    <div className="w-[500px] mt-28 mx-auto px-10 py-5 bg-white shadow-2xl">
      <h1 className='font-semibold text-center text-3xl text-blue-500'>User Form</h1>
      <form onSubmit={handleSubmit}>
        <div className='rounded-full mt-5 w-[320px] ml-3 relative'>
          <label htmlFor='name'></label>
          <FaRegUser size={'20px'} className='absolute left-3  transform inset-y-8 text-blue-500' />
          <input
            type='text'
            name='name'
            id='name'
            placeholder='UserName'
            value={user.name}
            onChange={handleInputChange}
            className='focus:outline-none w-[400px] border-2 mt-5 border-gray-300 p-2 rounded-xl pl-10 text-blue-500 placeholder-blue-500'
          />
          <p className="text-red-500 text-xs ml-3">{error.userNameError}</p>
        </div>
        <div className='rounded-full mt-5 w-[320px] ml-3 relative'>
          <label htmlFor='email'></label>
          <MdOutlineMailOutline size={'20px'} className='absolute left-3 transform inset-y-3 text-blue-500' />
          <input
            type='email'
            name='email'
            id='email'
            placeholder='E-mail'
            value={user.email}
            onChange={handleInputChange}
            className='focus:outline-none w-[400px] border-2 border-gray-300 p-2 rounded-xl pl-10 text-blue-500 placeholder-blue-500'
          />
          <p className="text-red-500 text-xs ml-3">{error.emailError}</p>
         
        </div>
        <div className='rounded-full mt-5 w-[320px] ml-3 relative'>
          <label htmlFor='password'></label>
          <IoKeyOutline size={'20px'} className='absolute left-3 transform inset-y-3 text-blue-500' />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            value={user.password}
            onChange={handleInputChange}
            className='focus:outline-none w-[400px] border-2 border-gray-300 p-2 rounded-xl pl-10 text-blue-500 placeholder-blue-500'
          />
          <p className="text-red-500 text-xs ml-3">{error.passwordError}</p>
         
        </div>
        <button type='submit' className='bg-blue-500 w-[400px] text-white px-4 py-2 ml-3 rounded-xl mt-5'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
