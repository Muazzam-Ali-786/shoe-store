"use client";

import './signup.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login, signup } from '@/lib/persistedAuthSlice';

// Validation Schemas
const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const signupSchema = yup.object().shape({
  username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function Signup() {
  const [isLogin, setIsLogin] = useState(true); // Default to login as requested
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : signupSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let result;
      if (isLogin) {
        result = await dispatch(login({ email: data.email, password: data.password })).unwrap();
        toast.success('Login successful!');
        router.push('/'); // Redirect to home or previous page
      } else {
        result = await dispatch(signup({ username: data.username, email: data.email, password: data.password })).unwrap();
        toast.success('Signup successful! Welcome to ShoeStore.');
        router.push('/');
      }
    } catch (error) {
      const errorMsg = error.message || 'Something went wrong';
      toast.error(errorMsg);
      
      // If user not found, suggest signup
      if (isLogin && errorMsg.toLowerCase().includes('email not found')) {
        // We could offer to switch to signup tab here
        // setIsLogin(false); // Uncomment if you want automatic switch
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleTab = (loginMode) => {
    setIsLogin(loginMode);
    reset(); // Clear form when switching tabs
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h1 className="brand-logo">ShoeStore</h1>
            <p className="welcome-text">
              {isLogin ? 'Welcome back! Login to your account.' : 'Join us! Create a new account.'}
            </p>
          </div>

          <div className="tab-toggle">
            <button 
              className={`tab-btn ${isLogin ? 'active' : ''}`}
              onClick={() => toggleTab(true)}
            >
              Login
            </button>
            <button 
              className={`tab-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => toggleTab(false)}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
            {!isLogin && (
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Username" 
                  {...register('username')}
                  className={errors.username ? 'input-error' : ''}
                />
                {errors.username && <span className="error-msg">{errors.username.message}</span>}
              </div>
            )}

            <div className="input-group">
              <input 
                type="email" 
                placeholder="Email Address" 
                {...register('email')}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-msg">{errors.email.message}</span>}
            </div>

            <div className="input-group">
              <input 
                type="password" 
                placeholder="Password" 
                {...register('password')}
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="error-msg">{errors.password.message}</span>}
            </div>

            {!isLogin && (
              <div className="input-group">
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  {...register('confirmPassword')}
                  className={errors.confirmPassword ? 'input-error' : ''}
                />
                {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword.message}</span>}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Create Account')}
            </button>
          </form>

          {isLogin && (
            <div className="forgot-link">
              <a href="#">Forgot Password?</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
