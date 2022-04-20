import Head from "next/head";
import React from "react";
import { Provider } from "next-auth/client";
import Navbar from "../components/Navbar";
import CartContextProvider from "../components/CartContextProvider";
import "swiper/swiper.scss";
import ErrorBoundary from "../components/ErrorBoundary";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Online store for Cartagena Decor" />
        <meta
          name="facebook-domain-verification"
          content="6fv6uotwskkrcy3d1m84tw0cvuljqn"
        />
        <title>Cartagena Decor</title>
      </Head>
      <CartContextProvider>
        <Provider session={pageProps.session}>
          <ErrorBoundary>
            <Navbar />
            <Component {...pageProps} />
          </ErrorBoundary>
        </Provider>
      </CartContextProvider>
    </>
  );
}

export default MyApp;
