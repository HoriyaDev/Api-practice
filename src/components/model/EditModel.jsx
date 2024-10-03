import React, { useEffect, useState } from 'react';
import { handleGet, handlePut } from '../../api/api';
import { FaRegUser } from "react-icons/fa6";
import { IoKeyOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";


const EditModel = ({ open, onClose, userId, setData , data}) => {
  const [input, setInput] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await handleGet(userId);
      if (userData) {
        setInput({
          userName: userData.userName,
          email: userData.email,
          password: userData.password,
        });
      }
    };

    if (userId && open) {
      fetchUserData();
    }
  }, [userId, open]);

 
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await handlePut(userId, input);
      setData((prevData) => 
        prevData.map((user) => (user.id === userId ? { ...user, ...input } : user)) 
      );
      onClose(); 
    } catch (error) {
      console.error('Error updating user: ', error);
    }
  };
  

  if (!open) return null;

  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50'>
      <div className='relative bg-white w-[520px] h-[500px] rounded-xl shadow p-5'>
        <h1 className='font-bold text-3xl text-center text-blue-500'>Edit User</h1>
        <form onSubmit={handleUpdate}>
          <div className=' p-4'>
       
            <div className='rounded-full  mt-5 w-[320px] ml-3 relative'>
              <label htmlFor='name'></label>
              <FaRegUser size={'20px'} className='absolute left-3 top-1/2 transform inset-y-2 text-blue-500' />
              <input
                type='text'
                name='userName'
                id='userName'
                placeholder='UserName'
                value={input.userName}
                onChange={handleInputChange}
                className='focus:outline-none w-[400px] border-2 mt-5 border-gray-300 p-2 rounded-xl pl-10 placeholder-blue-500'
              />
            </div>

            <div className='rounded-full  mt-5 w-[320px] ml-3 relative'>
              <label htmlFor='email'></label>
              <MdOutlineMailOutline size={'20px'} className='absolute left-3  transform inset-y-3 text-blue-500' />

              <input
                 type='email'
                name='email'
               id='email'
                placeholder='Email'
                value={input.email}
                onChange={handleInputChange}
                className='focus:outline-none w-[400px] border-2  border-gray-300 p-2 rounded-xl pl-10 placeholder-blue-500'
              />
            </div>

          
            <div className='rounded-full  mt-5 w-[320px] ml-3 relative'>
              <label htmlFor='password'></label>
              <IoKeyOutline size={'20px'} className='absolute left-3  transform inset-y-3 text-blue-500' />

              <input
                 type='password'
                name='password'
               id='password'
                placeholder='Password'
                value={input.password}
                onChange={handleInputChange}
                className='focus:outline-none w-[400px] border-2  border-gray-300 p-2 rounded-xl pl-10 placeholder-blue-500'
              />
            </div>

          </div>

          <button type='submit' className='bg-blue-500 w-[400px] text-white px-4 py-2 ml-7 rounded-xl mt-5'>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModel;
