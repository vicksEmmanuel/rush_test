import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Environment } from '../modules/environment';
import '../styles/globals.css';

const theme = extendTheme({
  colors: {
    brand: '#0F2A6B',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Rush Test {Environment.isProduction ? '' : ' (dev)'}</title>
        <link rel="icon" href="/favicon.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&family=Silkscreen:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
