import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { AppContextProvider } from '../components/AppContext'; // import the context provider

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default MyApp;
