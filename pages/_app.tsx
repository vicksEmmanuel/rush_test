import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Head from 'next/head';
import { Provider } from 'urql';
import { createUrqlClient } from '../modules/createUrqlClient';
import { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import { Environment } from '../modules/environment';
import ErrorBoundary from '../components/ErrorBoundary';

const theme = extendTheme({
  colors: {
    brand: '#0F2A6B',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider value={createUrqlClient}>
        <Head>
          <title>Rush Test {Environment.isProduction ? '' : ' (dev)'}</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
