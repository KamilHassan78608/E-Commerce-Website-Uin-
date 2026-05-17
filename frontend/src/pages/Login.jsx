import React, { useState } from 'react'
import { useAuth } from '../contents/AuthContext';

const Login = () => {

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email : '',
    password : ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name] : e.target.value });
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await login(formData);

    if (result.success) {
      alert("User Rigister Succesfully!");
    } else {
      alert(result.error);
    };
  }

  return (
    <div className='h-[82vh] flex justify-center items-center'>
      
      <div>
        <form onSubmit={handleLogin} className='min-w-[25vw] flex flex-col gap-4 shadow-2xl shadow-gray-400 rounded-2xl p-10'>
            <h2 className='text-4xl font-bold'>Login</h2>
            <input 
             type="email"
             placeholder='Enter Your Email'
             className='border py-2 px-4 text-gray-800 outline-none'
             onChange={handleChange}
             name='email'
             value={formData.email}
             required
            />
            <input 
             type="password"
             placeholder='Enter Your Password'
             className='border py-2 px-4 text-gray-800 outline-none'
             onChange={handleChange}
             name='password'
             value={formData.password}
             required
            />
            <button type='submit' className='bg-black text-white py-2 cursor-pointer'>Login</button>
            <div className='flex justify-between text-gray-500 text-sm'>
                <a href='/signup' className='cursor-pointer hover:text-indigo-500'>Create new Account</a>
                <a href='/signup' className='cursor-pointer hover:text-indigo-500'>Forget Password?</a>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
