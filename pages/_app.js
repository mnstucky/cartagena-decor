import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/mystyles.css';
import '../styles/customStyles.css';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  // Load saved cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(window.localStorage.getItem('cart'));
    setCart(storedCart || []);
  }, []);
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" href="./public/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <title>Cartagena Decor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar cart={cart} />
      <Component cart={cart} setCart={setCart} {...pageProps} />
    </>
  );
}

export default MyApp;
