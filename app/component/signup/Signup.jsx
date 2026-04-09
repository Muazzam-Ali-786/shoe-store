"use client";
import './signup.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { login, signup } from '../../../lib/reducers/authSlice';

export default function Signup() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await dispatch(login({ email, password }));
      } else {
        await dispatch(signup({ username, email, password }));
      }
      toast.success(isLogin ? 'Login successful!' : 'Signup successful!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h1>ShoeStore</h1>
            <p>Welcome back! Please {isLogin ? 'sign up' : 'log in'} to your account.</p>
          </div>
          <div className="tab-toggle">
            <button 
              className={`tab-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
            <button 
              className={`tab-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
          <form onSubmit={handleSubmit} className="signup-form">
            {!isLogin && (
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isLogin && (
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
            <button type="submit" className="submit-btn">
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          <div className="forgot-link">
            <a href="#">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}
