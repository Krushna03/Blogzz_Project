import React from 'react';

const LoaderBtn = () => {
  const loaderStyle = {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    display: 'inline-block',
    borderTop: '3px solid #FFF',
    borderRight: '3px solid transparent',
    boxSizing: 'border-box',
    animation: 'rotation 1s linear infinite',
  };

  const rotationKeyframes = `
    @keyframes rotation {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div>
      <style>{rotationKeyframes}</style>
      <span style={loaderStyle}></span>
    </div>
  );
};

export default LoaderBtn;
