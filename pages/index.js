import React from 'react';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div className='container pr-3 pl-3'>
      <div className='block'>
        <Hero />
      </div>
      <div className='block'>
        <h1 className='is-size-3 is-size-5-mobile is-uppercase is-family-secondary ml-2 has-text-black'>
          Welcome to Cartagena Decor and Maran Caf&eacute;!
        </h1>
      </div>
      <div className='block'>
        <p className='is-size-5-desktop'>
          Established in 2016, Cartagena Decor LLC works with coffee producers
          and local artists in Colombia through direct and fair trade practices.
          Cartagena Decor is the authorized distributor of Maran Caf&eacute;,
          single-origin specialty Colombian coffee.
        </p>
      </div>
      <div className='block'>
        <p className='is-size-5-desktop'>
          Check out our full range of products!
        </p>
      </div>
    </div>
  );
}
