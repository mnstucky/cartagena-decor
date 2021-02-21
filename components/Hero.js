import React from "react";

function Hero() {
  return (
    <div className="box">
      <div className="carousel-wrapper">
        <span id="item-1" />
        <span id="item-2" />
        <span id="item-3" />
        <div className="carousel-item item-1">
          <h2></h2>
          <a className="arrow arrow-prev" href="#item-3"></a>
          <a className="arrow arrow-next" href="#item-2"></a>
        </div>

        <div className="carousel-item item-2">
          <h2></h2>
          <a className="arrow arrow-prev" href="#item-1"></a>
          <a className="arrow arrow-next" href="#item-3" />
        </div>

        <div className="carousel-item item-3">
          <h2></h2>
          <a className="arrow arrow-prev" href="#item-2" />
          <a className="arrow arrow-next" href="#item-1" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
