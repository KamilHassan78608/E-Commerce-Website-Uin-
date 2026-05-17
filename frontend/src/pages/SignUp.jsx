import React, { useState } from 'react'
import { useAuth } from '../contents/AuthContext';


const SignUp = () => {

    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name : '',
        email : '',
        password : ''
    });
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    };

    const handleSignup  = async (e) => {
        e.preventDefault();

        if (formData.password !== confirmPassword) {
            alert ("Password doesnot match");
            return;
        }

        const result = await register(formData);
        
        if (result.success) {
            alert("User Rigister Succesfully!");
        } else {
            alert(result.error);
        };
        
    }

  return (
    <div className='h-[82vh] flex justify-center items-center'>
      
      <div>
        <form onSubmit={handleSignup} className='min-w-[25vw] flex flex-col gap-4 shadow-2xl shadow-gray-400 rounded-2xl p-10'>
            <h2 className='text-4xl font-bold'>Create an Account</h2>
            <input
             type="text"
             placeholder='Enter Your Name' 
             className='border py-2 px-4 text-gray-800 outline-none'
             value={formData.name}
             name='name'
             onChange={handleChange}
             required
            />
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
            <input 
             type="password"
             placeholder='Confirm Your Password'
             className='border py-2 px-4 text-gray-800 outline-none'
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             required
            />
            <div className='flex gap-1'>
                <input type="checkbox" required/>
                <label className='text-sm text-gray-600 '><a href="#" >I agree with terms and conditions</a></label>
            </div>
            <button type='submit' className='bg-black text-white py-2 cursor-pointer'>Sign Up</button>
            <div className='flex justify-between text-gray-500 text-sm'>
                <a href='/' className='cursor-pointer hover:text-indigo-500'></a>
                <a href='/login' className='cursor-pointer hover:text-indigo-500'>Already have Account?</a>
            </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
