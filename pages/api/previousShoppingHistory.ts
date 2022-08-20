// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isAfter, isBefore, isSameDay, isValid } from 'date-fns';
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
  const value = previousShoppingList.filter((i: Shop) => {
    if (
      !isEmpty(query.name) &&
      i.name?.toLowerCase().includes(query.name?.toLowerCase()!)
    ) {
      return true;
    } else if (
      !isEmpty(query.store) &&
      i.store?.toLowerCase().includes(query.store?.toLowerCase()!)
    ) {
      return true;
    } else if (
      isValid(new Date(query.startDate!)) &&
      new Date(i.dateTime) >= new Date(query?.startDate!) &&
      isValid(new Date(query.endDate!)) &&
      new Date(i.dateTime) <= new Date(query?.endDate!)
    ) {
      return true;
    }
    return false;
  });
  const limitedResult = (value as any)
    .sort(sort)
    .slice(0, controls) as unknown as Array<Shop>;

  res
    .status(200)
    .json({ data: limitedResult, hasNextPage: controls > value.length });
}
