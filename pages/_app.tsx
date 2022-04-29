import Head from "next/head";
import React from "react";
import { Container, CssBaseline } from "@mui/material";
import { Provider } from "next-auth/client";
import Navbar from "../components/Navbar";
import CartContextProvider from "../components/CartContextProvider";
import ErrorBoundary from "../components/ErrorBoundary";

function MyApp({ Component, pageProps }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileDrawerOpen((state) => !state);
  };
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
        <CssBaseline />
        <Provider session={pageProps.session}>
          <ErrorBoundary>
            <Navbar />
            <Container style={{ paddingTop: '45px' }}>
              <Component {...pageProps} />
            </Container>
          </ErrorBoundary>
        </Provider>
      </CartContextProvider>
    </>
  );
}

export default MyApp;
