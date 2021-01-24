import Head from "next/head";
import Navbar from "../components/Navbar";
import "../styles/mystyles.css";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" href="./public/favicon.ico" />
        <script
          src="https://kit.fontawesome.com/216d5e86f9.js"
          crossorigin="anonymous"
        ></script>
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
      <Navbar />
      <Component cart={cart} setCart={setCart} {...pageProps} />
    </>
  );
}

export default MyApp;
