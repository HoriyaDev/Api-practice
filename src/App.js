// import React, { useEffect, useState } from 'react';
// import './App.css';
// import axios from 'axios';

// function App() {
//   const [get, setGet] = useState(''); // Initialize as an empty string
//   const [put, setPut] = useState(''); // Initialize for future use (if needed)

//   const handleGet = () => {
//     axios
//       .get('https://jsonplaceholder.typicode.com/posts/4')
//       .then(({ data }) => {
//         setGet(data.title); // Set the title directly
//         console.log(data); // Log the whole response
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   };

//   const handlePost = () => {
//     axios
//       .post('https://jsonplaceholder.typicode.com/posts', { title: 'Hello World!' }) 
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.error('Error posting data:', error); 
//       });
//   };

//   const newData = {
//     title: "heloooo pakistan"
//   }

//   const handlePut = () => {
//     axios.put('https://jsonplaceholder.typicode.com/posts/4', newData)
//       .then((response) => {
//         console.log(response.data);
//         setGet(response.data.title); 
//       })
//       .catch((error) => {
//         console.error('Error updating data:', error); 
//       });
//   };
// const handleDelete = () =>{
//   axios.delete('https://jsonplaceholder.typicode.com/posts/4' ,newData )
//   .then((response)=>{
//     console.log(response.data)
//   })
// }
//   return (
//     <div>
//       <h1>Check the console for fetched data</h1>
//       <p>{get}</p>
      
  
//       <button type='button' className='bg-orange-300 px-5 py-2 rounded-2xl' onClick={handleGet}>GET</button>
//       <button type='button' className='bg-orange-300 px-5 py-2 rounded-2xl' onClick={handlePost}>POST</button>
//       <button type='button' className='bg-orange-300 px-5 py-2 rounded-2xl' onClick={handlePut}>PUT</button>
//       <button type='button' className='bg-orange-300 px-5 py-2 rounded-2xl' onClick={handleDelete}>DELETE</button>
      
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import './App.css';

import Form from './form/Form';
import Table from './table/Table';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
  <BrowserRouter>
        <Routes>
          
          <Route path="/form" element={<Form />} />
          <Route path="/" element={<Table />} />

        </Routes>
      </BrowserRouter>

    
    </>
  )

}
export default App;