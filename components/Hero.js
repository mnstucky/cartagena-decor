import React, { useEffect } from 'react';

function Hero() {
  useEffect(() => {
    const rotatingImages = ['./#item-1', './#item-2', './#item-3'];
    let rotatingImagesIndex = 0;
    const timer = setInterval(() => {
      window.location = rotatingImages[rotatingImagesIndex];
      rotatingImagesIndex = (rotatingImagesIndex + 1) % rotatingImages.length;
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="box">
      <div className="carousel-wrapper">
        <span id="item-1" />
        <span id="item-2" />
        <span id="item-3" />
        <div className="carousel-item item-1">
          <h2 />
          <a className="arrow arrow-prev" href="#item-3" />
          <a className="arrow arrow-next" href="#item-2" />
        </div>

        <div className="carousel-item item-2">
          <h2 />
          <a className="arrow arrow-prev" href="#item-1" />
          <a className="arrow arrow-next" href="#item-3" />
        </div>

        <div className="carousel-item item-3">
          <h2 />
          <a className="arrow arrow-prev" href="#item-2" />
          <a className="arrow arrow-next" href="#item-1" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
