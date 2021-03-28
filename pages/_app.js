import Head from 'next/head';
import React from 'react';
import Navbar from '../components/Navbar';
import CartContextProvider from '../components/CartContextProvider';
import '../styles/mystyles.css';
import '../styles/customStyles.css';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  // Load saved cart from localStorage
  // useEffect(() => { TODO: Figure out the best way to bring stored state in from local storage
  //   const storedCart = JSON.parse(window.localStorage.getItem('cart'));
  //   setCart(storedCart || []);
  // }, []);

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href="./public/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Online store for Cartagena Decor"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <title>Cartagena Decor</title>
      </Head>
      <CartContextProvider>
        <Provider session={pageProps.session}>
          <Navbar />
          <Component {...pageProps} />
        </Provider>
      </CartContextProvider>
    </>
  );
}

export default MyApp;
