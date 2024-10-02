import React, { useEffect, useState } from 'react';
import { handleGet, handlePut } from '../../api/api';

const EditModel = ({ open, onClose, userId }) => {
  const [input, setInput] = useState({
    userName: '',
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
          password: userData.password ,
        });
      }
    };

    if (userId && open) {
      fetchUserData();
    }
  }, [userId, open]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await handlePut(userId, input); // Pass updated data to handlePut function
    onClose(); // Close the modal after update
  };

  if (!open) return null;

  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50'>
      <div className='relative bg-white w-[520px] h-[550px] rounded-xl shadow p-5'>
        <form onSubmit={handleUpdate}>
          <div className='bg-slate-400 p-4'>
            <div className='rounded-full flex flex-col mt-5 w-[320px] ml-3'>
              <label htmlFor='userName'>User Name</label>
              <input
                type='text'
                name='userName' // Correct field name
                id='userName'
                value={input.userName} // Controlled input for userName
                onChange={handleInputChange}
                className='focus:outline-none border-none p-2 rounded-xl'
              />
            </div>
            <div className='rounded-full flex flex-col mt-5 w-[320px] ml-3'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                value={input.password} // Controlled input for password
                onChange={handleInputChange}
                className='focus:outline-none border-none p-2 rounded-xl'
              />
            </div>
          </div>

          <button type='submit' className='px-4 py-1 bg-orange-400 rounded-xl'>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModel;
