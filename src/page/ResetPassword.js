import React, { useState } from 'react';
import { auth } from '../../firebase';
import {  sendPasswordResetEmail  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
  
    const handleResetPassword = async (e) => {
      e.preventDefault();
      try {
        await sendPasswordResetEmail(auth, email); // Send password reset email
        alert('Password reset email sent. Please check your email.');
        navigate(`/signin`);
      } catch (error) {
        alert('Error sending password reset email. Please try again.');
      }
    };
  
    return (
      <div>
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    );
  }
  
  export default ResetPassword;
  