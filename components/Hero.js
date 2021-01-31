import React from 'react';

function Hero() {
  const heroStyles = {
    backgroundImage: 'url("/images/hero.JPG")',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    webkitTextStroke: '1px black',
    textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
  };
  return (
    <div className="hero">
      <div className="hero-body" style={heroStyles}>
        <h1 className="title is-2 mt-2 has-text-light is-family-secondary">
          CARTAGENA DECOR
        </h1>
      </div>
    </div>
  );
}

export default Hero;
