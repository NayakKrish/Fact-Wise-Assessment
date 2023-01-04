import Head from "next/head";
import "../styles/globals.css";
import { Provider as ReduxProvider } from 'react-redux';
import store from '../redux/store';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Rick&Morty</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    </>
  );
}

export default MyApp;
