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
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import BasicDateRangePicker from '../components/BasicDateRangePicker';
import Layout from '../layout/layout';
import { Shop } from '../state/useShopList';
import { Data, Query } from './api/previousShoppingHistory';

const History = () => {
  const fetchHistory = async (e: Query) => {
    const url = `/api/previousShoppingHistory?limit=${e.limit}&pageNumber=${e.pageNumber}&store=${e.store}&name=${e.name}&startDate=${e.startDate}&endDate=${e.endDate}`;
    const response = await fetch(url);
    const data = await response.json();
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

    setResult([...resultFromApi.data]);
  };

  const listInnerRef = useRef();

  const onScroll = async () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        const newResults = (await fetchHistory({
          limit: 10,
          name: watch('name'),
          store: watch('store'),
          pageNumber: pageNumber + 1,
          startDate: watch('dateRange')?.[0] ?? undefined,
          endDate: watch('dateRange')?.[1] ?? undefined,
        })) as Data;
        setPageNumber(pageNumber + 1);

        setResult([...result, ...(newResults?.data ?? [])]);
      }
    }
  };

  return (
    <Layout>
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
            <Button type="submit" colorScheme="blue">
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
                width: '80%',
                overflowY: 'auto',
              }}
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Product</Th>
                    <Th>Store</Th>
                    <Th>Date</Th>
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
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default History;
