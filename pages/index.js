import React from 'react';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div className="container pr-3 pl-3">
      <div className="block">
        <Hero />
      </div>
      <div className="block">
        <p>Homepage content goes here.</p>
      </div>
    </div>
  );
}
