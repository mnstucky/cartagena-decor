import React from 'react';

function About() {
  console.log(process.env.MONGO_URL);
  return (
    <div className="container">
      <h1 className="title is-4 mt-2">About Us</h1>
      <p>
        Insert about us information here.
      </p>
    </div>
  );
}

export default About;
