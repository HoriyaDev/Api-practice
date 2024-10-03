import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditModel from '../components/model/EditModel';
import { FaRegEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import ReadModel from '../components/model/ReadModel';

const Table = () => {
  const [open, setOpen] = useState(false);
  const [openRead, setOpenRead] = useState(false);
  const [data, setData] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

 
  const filteredData = data.filter((item) =>
    item.userName.toLowerCase().includes(searchUser.toLowerCase())
  );

  const currentRecords = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

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

  const handleOpen = (id) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  const handleOpenRead = (id) => {
    setSelectedUserId(id);
    setOpenRead(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenRead(false);
    setSelectedUserId(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/Users/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting user: ', error);
    }
    alert("Are you sure?");
  };

  const handleSearchInputChange = (e) => {
    setSearchUser(e.target.value); 
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-[900px] mt-10 mx-auto p-5 bg-white shadow-2xl">
      <div className="flex justify-end items-center">
        <input
          type="text"
          placeholder="Search"
          className="focus:outline-none w-[300px] border-2   border-gray-300 p-2 rounded-xl"
          value={searchUser}
          onChange={handleSearchInputChange}
        />
        <Link to="/form">
          <button type="button" className="px-3 py-1 ml-4 bg-blue-500 right-0 text-white">
            + Add
          </button>
        </Link>
      </div>

      <table className="table-auto w-full mt-4">
        <thead className="border-2 border-gray-200">
          <tr>
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">User Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Password</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item) => (
            <tr key={item.id} className="p-2">
              <td className="border px-2 py-2">{item.id}</td>
              <td className="border px-2 py-2">{item.userName}</td>
              <td className="border px-2 py-2">{item.email}</td>
              <td className="border px-2 py-2">{item.password}</td>
              <td className="border px-2 py-2">
                <div>
                  <button
                    type="button"
                    className="bg-slate-600 px-2 py-1 rounded-lg"
                    onClick={() => handleOpenRead(item.id)}
                  >
                    <FaRegEye size="20px" className="text-white" />
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 px-2 py-1 rounded-lg ml-1"
                    onClick={() => handleOpen(item.id)}
                  >
                    <FaEdit size="20px" className="text-white text-center" />
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 px-3 py-1 rounded-lg ml-1"
                    onClick={() => handleDelete(item.id)}
                  >
                    <IoCloseSharp size="20px" className="text-white text-center" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <ReadModel open={openRead} onClose={handleClose} userId={selectedUserId}  />
      <EditModel open={open} onClose={handleClose} userId={selectedUserId} setData={setData} data={data} />
    </div>
  );
};

export default Table;
