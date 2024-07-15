import React, { useReducer, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import useAuth from '../context/AuthContext'

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}

// var messeage;
function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useReducer(formReducer, {});
    const [response, setresponse] = useState('');
    const {login} = useAuth();

    const handleSubmit = event => {
        event.preventDefault();
        console.log(formData);
        axios.post("http://localhost:8080/login", formData)
            .then((response) => {
                // messeage = response.data.mes;
                // console.log(response.data.ke y)
                setresponse(response.data.mes);
                if(response.data.key != null)
                {
                  login(response.data);
                  navigate("/");
                }
 
              })
      }
  return (
    // <div className="wrapper">
    //   <h1>Login</h1>

    //   <form onSubmit={handleSubmit}>
    //     <fieldset>
    //       <div>
    //         <label>Email: </label>
    //         <input
    //           name="email"
    //           type="email"
    //           onChange={setFormData}
    //           required
    //         ></input>
    //       </div>
    //       <div>
    //         <label>password: </label>
    //         <input
    //           name="pwd"
    //           type="password"
    //           onChange={setFormData}
    //           required
    //         ></input>
    //       </div>
    //     </fieldset>
    //     <div>
    //       <button type="submit">Submit</button>
    //     </div>
    //   </form>

    //   {/* {mes && <h3>{mes}</h3>} */}
    // </div>

    <div className='App bg-gray-900 h-screen w-screen relative overflow-hidden flex flex-col justify-center items-center'>
      <div className='h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 animate-pulse'></div>
      <div className='h-35-r w-35-r bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 rounded-full absolute top-96 -left-20 animate-pulse'></div>
        <div className='container h-96 w-96 bg-white bg-opacity-10 relative z-2 rounded-2xl shadow-5xl border border-r-0 border-b-0 border-opacity-30 backdrop-filter backdrop-blur-sm'>
          <form className='h-full flex flex-col justify-evenly items-center' onSubmit={handleSubmit}>
            <div className='font-poppins text-white text-2xl tracking-wider'>Login</div>
            <input type='email' placeholder='Email' name='email' className='input-text' onChange={setFormData} required></input>
            <input type='password' placeholder='Password' name='pwd' className='input-text' onChange={setFormData} required></input>
            <input type="submit" className='font-poppins cursor-pointer px-5 py-1 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80'/>
            {response && <div className='font-poppins text-red-600 bg-transparent focus:outline-none tracking-wide'>{response}</div>}
          </form>
        </div>
        
    </div>
  );
}

export default LoginForm;
