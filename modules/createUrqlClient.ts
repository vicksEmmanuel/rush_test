import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
} from 'urql';
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch';
import { Environment } from './environment';

export const createUrqlClient = createClient({
  url: Environment.backendUrl + '/query',
  exchanges: [
    multipartFetchExchange,
    dedupExchange,
    cacheExchange,
    fetchExchange,
  ],

  fetchOptions: () => {
    if (typeof window !== 'undefined') {
      let root = window.localStorage.getItem('root') as string;

      if (JSON.parse(root)) {
        const { token } = JSON.parse(JSON.parse(root).auth);

        return {
          headers: { Authorization: `Bearer ${token}` },
        };
      }
    }

    return {};
  },
});
