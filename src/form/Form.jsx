// import axios from 'axios';
// import React, { useState } from 'react'

// const Form = () => {
//   const url = "http://localhost:3001/Users"; 

//   const [user , setUser] = useState({
//     name: '',
//     password:''
//   })
  
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   // const handleSubmit =(e)=>{
    
//   //   e.preventDefault();
//   //   axios.post(url,{
//   //     userName:user.name,
//   //     password:user.password,
//   //   })
//   //   .then((response=>{
//   //     console.log(response)
//   //     console.log(response.data)
//   //   }))
//   //   console.log(user)
//   //    setUser({
//   //     name:'',
//   //     password:''
//   //    })
//   // }


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post(url, {
//         userName: user.name,
//         password: user.password,
//     })
//     .then((response) => {
//         console.log("Response:", response);
//         console.log("Data:", response.data);
//         setUser({ name: '', password: '' }); // Reset the form
//     })
//     .catch((error) => {
//         console.error("There was an error posting the data!", error);
//     });
// }


//   return (
//     <div className='bg-slate-500 w-1/2 mx-auto p-5 mt-20'>
//       <form onSubmit={handleSubmit}>
//       <div className='rounded-full flex flex-col mt-5 w-[320px] ml-3'>
//             <label htmlFor='name'>First Name</label>
//             <input
//               type='text'
//               name='name'
//               id='name'
//               value={user.name}
//               onChange={handleInputChange}
              
//               className='focus:outline-none border-none p-2 rounded-xl'
//             />
//           </div>
//           <div className='rounded-full flex flex-col mt-5 w-[320px] ml-3'>
//             <label htmlFor='password'>Password</label>
//             <input
//               type='password'
//               name='password'
//               id='password'
//               value={user.password}
//               onChange={handleInputChange}
             
//               className='focus:outline-none border-none p-2 rounded-xl'
//             />
//           </div>


//           <button
//             type='submit'
//             className='bg-blue-900 text-white px-4 py-1 rounded-3xl mt-5'>
//             Submit
//           </button>

//       </form>
//     </div>
//   )
// }

// export default Form








import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {

  const navigate = useNavigate()
  const url = "http://localhost:5001/Users"; // Update to the correct URL
  const [user, setUser] = useState({
    name: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(url, {
      userName: user.name,
      password: user.password,
    })
    .then((response) => {
      console.log("Response:", response);
      console.log("Data:", response.data);
      setUser({ name: '', password: '' }); 
      navigate('/')
      // Reset form
    })
    .catch((error) => {
      console.error("There was an error posting the data!", error);
    });
  };

  return (
    <div className='bg-slate-500 w-1/2 mx-auto p-5 mt-20'>
      <form onSubmit={handleSubmit}>
        <div className='rounded-full flex flex-col mt-5 w-[320px] ml-3'>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={user.name}
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
            value={user.password}
            onChange={handleInputChange}
            className='focus:outline-none border-none p-2 rounded-xl'
          />
        </div>
        <button type='submit' className='bg-blue-900 text-white px-4 py-1 rounded-3xl mt-5'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
