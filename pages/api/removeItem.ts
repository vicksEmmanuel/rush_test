import { promises as fs } from 'fs';
import { isEmpty } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import previousShoppingList from '../../data/shop';
import { Shop } from '../../schemas/AddShopSchema';

export type Data = {
  data?: Shop;
  message?: string;
};

export interface RemoveQuery {
  id: string;
}

/**
 * Api that removes item from the list
 * @param req 
 * @param res 
 * @returns 
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let query = req.query as unknown as RemoveQuery;

  if (isEmpty(query)) {
    return res.status(200).send({ message: 'Nothing was added' });
  }

  const temp = (previousShoppingList as Array<Shop>).filter(
    (i) => i.id !== query.id
  );
  await fs.writeFile('data/shop.json', JSON.stringify(temp, null, 4));

  res.status(200).json({ message: 'Item Removed Successfully' });
}
