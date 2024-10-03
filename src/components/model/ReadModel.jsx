



import React, { useState, useEffect } from 'react';
import { handleGet } from '../../api/api';

const ReadModel = ({ open, onClose, userId }) => {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await handleGet(userId);
        if (userData) {
          setUser({
            userName: userData.userName,
            email: userData.email,
            password: userData.password,
          });
        }
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    console.log("userDetal" , user)

    if (userId && open) {
      fetchUserData();
    }
  }, [userId, open]);

 
  if (!open) return null;

  
  const handleClickInside = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-[500px] h-[250px] rounded-xl shadow p-5"
        onClick={handleClickInside}
      >
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
        <p><strong>Username:</strong> {user.userName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Password:</strong> {user.password}</p>

        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReadModel;
