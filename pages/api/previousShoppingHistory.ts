// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isEmpty } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import previousShoppingList from '../../data/shop';
import { Shop } from '../../state/useShopList';

type Data = {
  data: Array<Shop>;
};

export interface Query {
  limit?: number;
  pageNumber?: number;
  store?: string;
  date?: string;
  name?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let query = req.query as Query;

  if (isEmpty(query)) {
    query = { limit: 10, pageNumber: 1 };
  }

  const value = previousShoppingList
    .filter((i) => {
      if (i.name?.toLowerCase().includes(query.name?.toLowerCase() ?? '')) {
        return true;
      } else if (
        i.store?.toLowerCase().includes(query.store?.toLowerCase() ?? '')
      ) {
      } else if (true) {
        //TODO: search for datetime
        return false;
      }

      return false;
    })
    .slice(
      0,
      (query.limit ?? 10) * (query.pageNumber ?? 1)
    ) as unknown as Array<Shop>;

  res.status(200).json({ data: value });
}
