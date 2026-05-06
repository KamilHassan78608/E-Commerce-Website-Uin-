import React, { useState } from 'react'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'

const Auth = () => {
  const [isLogin, setisLogin] = useState(true);
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const features = [
    {
      icon: <CheckCircle className='w-6 h-6' />,
      title: "Easy Checkout",
      description: "Fast and secure payment process"
    },
    {
      icon: <CheckCircle className='w-6 h-6' />,
      title: "Order Tracking",
      description: "Real-time updates on your orders"
    },
    {
      icon: <CheckCircle className='w-6 h-6' />,
      title: "Exclusive Deals",
      description: "Member-only discounts and offers"
    },
    {
      icon: <CheckCircle className='w-6 h-6' />,
      title: "Safe & Secure",
      description: "Your data is always protected"
    }
  ];

  return (
    <div className='my-20 bg-white flex justify-center items-center'>

      {/* Right Side - Auth Forms */}
      <div className='w-full lg:w-1/2 flex flex-col justify-center p-6 md:p-12'>
        
        <div className='max-w-md mx-auto w-full'>
          
          {/* Header */}
          <div className='text-center mb-10'>
            <h1 className='text-4xl font-black text-gray-900 mb-2'>
              {isLogin ? 'Welcome Back' : 'Join Us'}
            </h1>
            <p className='text-gray-600 text-sm'>
              {isLogin 
                ? 'Sign in to your account to continue shopping' 
                : 'Create an account to get started'}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className='flex gap-2 mb-10 p-1 bg-gray-100 rounded-xl'>
            <button
              onClick={() => setisLogin(true)}
              className={`flex-1 py-3 font-bold rounded-lg transition-all ${
                isLogin
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setisLogin(false)}
              className={`flex-1 py-3 font-bold rounded-lg transition-all ${
                !isLogin
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {isLogin && (
            <form className='space-y-6'>
              
              {/* Email Input */}
              <div>
                <label className='block text-sm font-bold text-gray-900 mb-2'>Email Address</label>
                <div className='relative'>
                  <Mail className='absolute left-4 top-4 w-5 h-5 text-gray-400' />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-medium transition-colors'
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <label className='block text-sm font-bold text-gray-900'>Password</label>
                  <a href='#' className='text-xs text-indigo-600 hover:text-indigo-700 font-bold'>Forgot?</a>
                </div>
                <div className='relative'>
                  {showPassword ? (
                    <EyeOff className='absolute right-4 top-4 w-5 h-5 text-gray-400 cursor-pointer' onClick={() => setshowPassword(!showPassword)} />
                  ) : (
                    <Eye className='absolute right-4 top-4 w-5 h-5 text-gray-400 cursor-pointer' onClick={() => setshowPassword(!showPassword)} />
                  )}
                  <Lock className='absolute left-4 top-4 w-5 h-5 text-gray-400' />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className='w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-medium transition-colors'
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className='flex items-center gap-2'>
                <input type="checkbox" id='remember' className='w-4 h-4 accent-indigo-600 rounded cursor-pointer' />
                <label htmlFor='remember' className='text-sm text-gray-600 font-medium cursor-pointer'>Remember me</label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className='w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-xl hover:shadow-xl transition-all uppercase tracking-widest group flex items-center justify-center gap-2'
              >
                Sign In
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </button>

              {/* Social Login */}
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-200'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-gray-600 font-medium'>Or continue with</span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <button type='button' className='py-3 border-2 border-gray-200 rounded-xl font-bold hover:border-indigo-300 transition-colors hover:bg-indigo-50'>
                  Google
                </button>
                <button type='button' className='py-3 border-2 border-gray-200 rounded-xl font-bold hover:border-indigo-300 transition-colors hover:bg-indigo-50'>
                  Facebook
                </button>
              </div>

            </form>
          )}

          {/* Sign Up Form */}
          {!isLogin && (
            <form className='space-y-6'>
              
              {/* Name Input */}
              <div>
                <label className='block text-sm font-bold text-gray-900 mb-2'>Full Name</label>
                <div className='relative'>
                  <User className='absolute left-4 top-4 w-5 h-5 text-gray-400' />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-medium transition-colors'
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className='block text-sm font-bold text-gray-900 mb-2'>Email Address</label>
                <div className='relative'>
                  <Mail className='absolute left-4 top-4 w-5 h-5 text-gray-400' />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-medium transition-colors'
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className='block text-sm font-bold text-gray-900 mb-2'>Password</label>
                <div className='relative'>
                  {showPassword ? (
                    <EyeOff className='absolute right-4 top-4 w-5 h-5 text-gray-400 cursor-pointer' onClick={() => setshowPassword(!showPassword)} />
                  ) : (
                    <Eye className='absolute right-4 top-4 w-5 h-5 text-gray-400 cursor-pointer' onClick={() => setshowPassword(!showPassword)} />
                  )}
                  <Lock className='absolute left-4 top-4 w-5 h-5 text-gray-400' />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className='w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-medium transition-colors'
                  />
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className='block text-sm font-bold text-gray-900 mb-2'>Confirm Password</label>
                <div className='relative'>
                  {showConfirmPassword ? (
                    <EyeOff className='absolute right-4 top-4 w-5 h-5 text-gray-400 cursor-pointer' onClick={() => setshowConfirmPassword(!showConfirmPassword)} />
                  ) : (
                    <Eye className='absolute right-4 top-4 w-5 h-5 text-gray-400 cursor-pointer' onClick={() => setshowConfirmPassword(!showConfirmPassword)} />
                  )}
                  <Lock className='absolute left-4 top-4 w-5 h-5 text-gray-400' />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className='w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none font-medium transition-colors'
                  />
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className='flex items-start gap-2'>
                <input type="checkbox" id='terms' className='w-4 h-4 accent-indigo-600 rounded cursor-pointer mt-1' />
                <label htmlFor='terms' className='text-sm text-gray-600 font-medium cursor-pointer'>
                  I agree to the <a href='#' className='text-indigo-600 hover:underline'>Terms & Conditions</a> and <a href='#' className='text-indigo-600 hover:underline'>Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className='w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-xl hover:shadow-xl transition-all uppercase tracking-widest group flex items-center justify-center gap-2'
              >
                Create Account
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
              </button>

            </form>
          )}

        </div>

        {/* Footer */}
        <div className='text-center mt-10 text-sm text-gray-600'>
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setisLogin(!isLogin)}
              className='text-indigo-600 hover:text-indigo-700 font-bold'
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

      </div>

    </div>
  )
}

export default Auth
