import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Table = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/Users'); 
        setData(response.data); 
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/Users/${id}`);
      // Filter out the deleted item from the state
      const newArray = data.filter((item) => item.id !== id);
      setData(newArray);
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-[500px] mt-10 mx-auto p-5 bg-white shadow-lg">
      <Link to='/form'>
        <button type='button' className="px-3 py-2 bg-gray-500 text-white">
          Add
        </button>
      </Link>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">User Name</th>
            <th className="px-4 py-2">Password</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item) => (
            <tr key={item.id}>
              <td className="border px-1 py-2">{item.id}</td>
              <td className="border px-1 py-2">{item.userName}</td>
              <td className="border px-1 py-2">{item.password}</td>
              <td className="border px-2 py-2">
                <div>
                  <button type='button' className='bg-green-400 px-3 py-1 rounded-2xl'>Edit</button>
                  <button type='button' className='bg-red-400 px-3 py-1 rounded-2xl' onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button onClick={goToPreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-500 text-white disabled:opacity-50">
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-500 text-white disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
