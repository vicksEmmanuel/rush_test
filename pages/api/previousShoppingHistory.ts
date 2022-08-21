// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isValid } from 'date-fns';
import { isEmpty } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import previousShoppingList from '../../data/shop';
import { Shop, sort } from '../../schemas/AddShopSchema';

export type Data = {
  data: Array<Shop>;
  hasNextPage?: boolean;
};

export interface Query {
  limit?: number;
  pageNumber?: number;
  store?: string;
  startDate?: string | Date;
  endDate?: string | Date;
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
  const controls = (query.limit ?? 10) * (query.pageNumber ?? 1);
  const value = [] as Array<Shop>;
  const finalSearch = [] as Array<Shop>;

  (previousShoppingList as Array<Shop>).forEach((i: Shop) => {
    if (
      !isEmpty(query.name) &&
      i.name?.toLowerCase().includes(query.name?.toLowerCase()!)
    ) {
      value.push(i);
    } else if (
      !isEmpty(query.store) &&
      i.store?.toLowerCase().includes(query.store?.toLowerCase()!)
    ) {
      value.push(i);
    } else if (isEmpty(query.name) && isEmpty(query.store)) {
      value.push(i);
    }
  });

  value.forEach((i) => {
    if (
      isValid(new Date(query.startDate!)) &&
      new Date(i.dateTime) >= new Date(query?.startDate!) &&
      isValid(new Date(query.endDate!)) &&
      new Date(i.dateTime) <= new Date(query?.endDate!)
    ) {
      finalSearch.push(i);
    }
  });

  const limitedResult = (finalSearch as any)
    .sort(sort)
    .slice(0, controls) as unknown as Array<Shop>;

  res
    .status(200)
    .json({
      data: limitedResult,
      hasNextPage: !(controls > finalSearch.length),
    });
}
