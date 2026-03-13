import React from 'react';

const GlassCard = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`liquid-glass p-6 ${className}`} 
      {...props}
      style={{
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }}
    >
      {children}
    </div>
  );
};

export default GlassCard;
