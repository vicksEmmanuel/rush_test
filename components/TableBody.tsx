import { Td, Tr } from '@chakra-ui/react';
import moment from 'moment';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import useApi from '../modules/hooks/useApi';
import { Shop } from '../schemas/AddShopSchema';
import Spinner from './Spinner';

const TableBody = ({ shop, editable }: { editable?: boolean; shop: Shop }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteItem } = useApi();
  return (
    <Tr>
      <Td textTransform={'capitalize'}>{shop.name}</Td>
      <Td textTransform={'capitalize'}>
        <a href={shop.storeLink} target={'_blank'} rel="noreferrer">
          {shop.store}
        </a>
      </Td>
      <Td isNumeric>
        {moment(new Date(shop.dateTime)).format('dddd, MMMM Do yyyy, HH:mm')}
      </Td>
      {editable && (
        <Td className="flex justify-center">
          {isLoading ? (
            <Spinner />
          ) : (
            <MdDelete
              onClick={async () => {
                setIsLoading(true);
                await deleteItem({ id: shop.id ?? '' });
                setIsLoading(false);
              }}
              className="cursor-pointer"
            />
          )}
        </Td>
      )}
    </Tr>
  );
};

export default TableBody;
