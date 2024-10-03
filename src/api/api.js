// src/api/api.js
import axios from "axios";

export const handleGet = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5001/Users/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
export const handlePut = async (id, updatedData) => {
    await axios.put(`http://localhost:5001/Users/${id}`, updatedData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error updating user: ', error);
      });
  };
  