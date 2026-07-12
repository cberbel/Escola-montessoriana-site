import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white';
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center min-h-[44px] px-6 sm:px-8 py-3 sm:py-4 text-base font-serif tracking-wide transition-all duration-300 rounded-sm touch-manipulation focus:outline focus:ring-2 focus:ring-montessori-gold focus:ring-offset-2";
  
  const variants = {
    primary: "bg-montessori-green text-montessori-gold hover:bg-blue-800 shadow-md hover:shadow-lg uppercase font-semibold",
    outline: "border-2 border-montessori-green text-montessori-green hover:bg-montessori-green hover:text-white uppercase font-semibold",
    white: "bg-white text-montessori-green hover:bg-gray-100 shadow-md uppercase font-semibold"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};