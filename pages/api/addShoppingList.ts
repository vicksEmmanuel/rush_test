import { promises as fs } from 'fs';
import { isEmpty } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'short-uuid';
import previousShoppingList from '../../data/shop';
import { Shop } from '../../schemas/AddShopSchema';

export type Data = {
  data?: Shop;
  message?: string;
};

/**
 * Api for adding new items to the list
 * @param req
 * @param res
 * @returns
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let body = req.body as Shop;

  if (isEmpty(body)) {
    return res.status(200).send({ message: 'Nothing was added' });
  }

  body = JSON.parse(body as unknown as string);

  const data = {
    name: body?.name ?? '',
    id: uuid(),
    storeLink: body?.storeLink ?? '',
    dateTime: new Date(),
    store: body?.store ?? '',
  };

  const temp = [{ ...data }, ...previousShoppingList];
  await fs.writeFile('data/shop.json', JSON.stringify(temp, null, 4));

  res
    .status(200)
    .json({ data: data as unknown as Shop, message: 'Created Successfully' });
}
