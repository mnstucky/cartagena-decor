import React from 'react';

function Error({ message = 'Sorry, something went wrong.' }) {
  return (
    <div className="box">
      <h1>{message}</h1>
    </div>
  );
}

export default Error;
