import React from 'react';
import AuthForm from '../components/AuthForm';
import { register } from '../services/api';

const Register = () => {
  const handleRegister = (formData) => {
    register(formData).then((response) => {
      console.log('Registered:', response);
      
    });
  };

  return (
    <div className="container mt-4">
      <h1>Register</h1>
      <AuthForm onSubmit={handleRegister} isLogin={false} />
    </div>
  );
};

export default Register;