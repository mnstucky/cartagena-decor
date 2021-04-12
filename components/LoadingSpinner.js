import React from 'react';

function LoadingSpinner() {
  const spinnerStyles = { minHeight: '60vh' };
  return (
    <div className="is-flex is-justify-content-center is-align-items-center" style={spinnerStyles}>
      <div className="sk-chase">
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
