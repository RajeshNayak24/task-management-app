import React from 'react';
import AuthForm from '../components/AuthForm';
import { login } from '../services/api';

const Login = () => {
  const handleLogin = (formData) => {
    login(formData).then((response) => {
      console.log('Logged in:', response);
      
    });
  };

  return (
    <div className="container mt-4">
      <h1>Login</h1>
      <AuthForm onSubmit={handleLogin} isLogin={true} />
    </div>
  );
};

export default Login;