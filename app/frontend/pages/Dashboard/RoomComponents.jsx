// app/javascript/Components/ui/card.jsx
import React from 'react';

const Card = ({ className = '', children }) => {
  return (
    <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ className = '', children }) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ className = '', children }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

const Badge = ({ children, variant = 'default' }) => {
const variants = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  destructive: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800'
};

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const Button = ({ 
  children, 
  variant = 'default', 
  disabled = false,
  className = '',
  ...props 
}) => {
  const variants = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white',
    outline: 'border border-gray-300 hover:border-gray-400 text-gray-700 bg-white',
  };

  return (
    <button
      className={`
        px-6 py-2 rounded-lg font-medium transition-colors
        ${variants[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export { Card, CardHeader, CardContent, Button, Badge };