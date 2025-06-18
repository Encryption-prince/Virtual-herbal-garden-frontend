import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ text, path = '#', onClick, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const token = localStorage.getItem('token');

    if (!token && path !== '#') {
      e.preventDefault(); // Stop default navigation
      alert("Please login first.");
      return;
    }

    if (onClick) onClick();
    if (path !== '#') navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative inline-flex items-center justify-center
        px-6 py-3 text-base font-bold rounded-full
        bg-transparent bg-opacity-10 backdrop-blur-md border border-white border-opacity-20
        text-white overflow-hidden group transform
        transition-all duration-00 ease-out hover:scale-105 
        ${className}
      `}
    >
      {/* Hover glow effect */}
      <span
        className="absolute inset-0 bg-gradient-to-tr from-green-500 to-lime-300 opacity-0 
        group-hover:opacity-20 transition duration-300 rounded-full blur-sm"
      ></span>

      <span className="relative z-10">{text}</span>
    </button>
  );
};

export default Button;
