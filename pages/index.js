import React from 'react';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div className="container pr-3 pl-3">
      <div className="block">
        <Hero />
      </div>
      <div className="block">
        <h1 className="is-size-3 is-size-5-mobile is-uppercase is-family-secondary ml-2 has-text-black">Welcome to Cartagena Decor!</h1>
      </div>
      <div className="block">
        <p className="is-size-5-desktop">Established in 2016, Cartagena Decor sells unique and authentic handcrafted-wood products inspired by Colombian folk art and perfect for decoration and for serving your favorite foods.</p>
      </div>
      <div className="block">
        <p className="is-size-5-desktop">Check out our full range of products!</p>
      </div>
    </div>
  );
}
