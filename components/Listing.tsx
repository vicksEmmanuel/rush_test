import {
  Box,
  Button,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { uniqBy } from 'lodash';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import BasicDateRangePicker from '../components/BasicDateRangePicker';
import { Data, Query } from '../pages/api/previousShoppingHistory';
import { RemoveQuery } from '../pages/api/removeItem';
import { Shop, sort } from '../schemas/AddShopSchema';

export interface ListingProps {
  editable?: boolean;
  value?: Shop;
}

const Listing = ({ editable, value }: ListingProps) => {
  const fetchHistory = async (e: Query) => {
    const url = `/api/previousShoppingHistory?limit=${e.limit}&pageNumber=${e.pageNumber}&store=${e.store}&name=${e.name}&startDate=${e.startDate}&endDate=${e.endDate}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const deleteItem = async (e: RemoveQuery) => {
    const url = `/api/removeItem?id=${e.id}`;
    const response = await fetch(url);
    const data = await response.json();

    const temp = result.filter((i) => i.id !== e.id);
    setResult([...temp]);

    return data;
  };

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: '',
      store: '',
      dateRange: [] as Array<Date> | undefined,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (value) {
      const temp = result;
      temp.unshift(value);
      setResult([...temp]);
    }
  }, [value]);

  useEffect(() => {
    submit(watch());
  }, []);

  const [result, setResult] = useState<Array<Shop>>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const submit = async (e: any) => {
    const resultFromApi = await fetchHistory({
      limit: 10,
      name: e?.name,
      store: e?.store,
      pageNumber: 1,
      startDate: watch('dateRange')?.[0] ?? undefined,
      endDate: watch('dateRange')?.[1] ?? undefined,
    });
    setPageNumber(1);

    const data = [...resultFromApi.data].sort(sort);
    setResult(uniqBy(data, 'id'));
  };

  const listInnerRef = useRef();

  const onScroll = async () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        const resultFromApi = (await fetchHistory({
          limit: 10,
          name: watch('name'),
          store: watch('store'),
          pageNumber: pageNumber + 1,
          startDate: watch('dateRange')?.[0] ?? undefined,
          endDate: watch('dateRange')?.[1] ?? undefined,
        })) as Data;
        setPageNumber(pageNumber + 1);

        const data = [...resultFromApi.data].sort(sort);
        setResult(uniqBy(data, 'id'));
      }
    }
  };

  return (
    <div className="z-50">
      <form
        onSubmit={handleSubmit(submit)}
        className="lg:flex lg:flex-row md:flex-row md:flex justify-center z-50 relative my-5"
      >
        <div className="flex flex-col mb-4 mx-3">
          <Input
            placeholder="Product Name"
            className="my-1 bg-white"
            backgroundColor={'white'}
            {...register('name')}
          />
        </div>
        <div className="flex flex-col mb-4 mx-3">
          <Input
            placeholder="Store Name"
            className="my-1 bg-white"
            backgroundColor={'white'}
            {...register('store')}
          />
        </div>
        <div className="flex flex-col mb-4 mx-3">
          <div className="">
            <BasicDateRangePicker
              setDateRange={(e) => {
                setValue('dateRange', [e?.startDate, e?.endDate]);
              }}
            />
          </div>
        </div>
        <div className="flex mb-4 mt-1 flex-col mx-3">
          <Button type="submit" backgroundColor={'black'} color={'#fff'}>
            Filter Search
          </Button>
        </div>
      </form>

      <div className="">
        <Box className="relative z-30 flex justify-center items-center">
          <TableContainer
            onScroll={onScroll}
            backgroundColor={'#fff'}
            ref={listInnerRef as any}
            style={{
              height: '500px',
              alignSelf: 'center',
              borderRadius: 30,
              width: '90%',
              overflowY: 'auto',
            }}
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th width={'30%'}>Product</Th>
                  <Th width={'30%'}>Store</Th>
                  <Th width={'30%'} textAlign={'center'}>
                    Date
                  </Th>
                  {editable && <Th>Delete</Th>}
                </Tr>
              </Thead>
              <Tbody>
                {result.map((i, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td textTransform={'capitalize'}>{i.name}</Td>
                      <Td textTransform={'capitalize'}>
                        <a
                          href={i.storeLink}
                          target={'_blank'}
                          rel="noreferrer"
                        >
                          {i.store}
                        </a>
                      </Td>
                      <Td isNumeric>
                        {moment(new Date(i.dateTime)).format(
                          'dddd, MMMM Do yyyy, HH:mm'
                        )}
                      </Td>
                      {editable && (
                        <Td className="flex justify-center">
                          <MdDelete
                            onClick={() => {
                              deleteItem({ id: i.id ?? '' });
                            }}
                            className="cursor-pointer"
                          />
                        </Td>
                      )}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </div>
  );
};

export default Listing;
