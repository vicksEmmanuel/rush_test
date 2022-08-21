import {
  Box,
  Button,
  Input,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  from,
  mergeMap,
} from 'rxjs';
import BasicDateRangePicker from '../components/BasicDateRangePicker';
import useApi from '../modules/hooks/useApi';
import useObservable from '../modules/hooks/useObservable';
import { Query } from '../pages/api/previousShoppingHistory';
import { Shop } from '../schemas/AddShopSchema';
import TableBody from './TableBody';

export interface ListingProps {
  editable?: boolean;
}

const Listing = ({ editable }: ListingProps) => {
  const { fetchHistory } = useApi();

  const { register, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      name: '',
      store: '',
      dateRange: [] as Array<Date> | undefined,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const [result, setResult] = useState<{
    data?: Array<Shop>;
    hasNextPage?: boolean;
  }>({ hasNextPage: true, data: [] });

  const [pageNumber, setPageNumber] = useState(1);

  const getProperties = () => {
    return {
      limit: 10,
      name: getValues('name'),
      store: getValues('store'),
      pageNumber,
      startDate: getValues('dateRange')?.[0] ?? undefined,
      endDate: getValues('dateRange')?.[1] ?? undefined,
    };
  };

  const searchObject = new BehaviorSubject(getProperties() as Query);
  const searchResultObservable = searchObject.pipe(
    debounceTime(750),
    distinctUntilChanged() as any,
    mergeMap((val: Query) => {
      return from(fetchHistory({ ...val }));
    })
  );

  useObservable(searchResultObservable, setResult);

  const submit = async () => {
    setPageNumber(1);
    reset();
    setTimeout(() => {
      searchObject.next(getProperties());
    }, 300);
  };

  const listInnerRef = useRef();

  const onScroll = async () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setPageNumber(pageNumber + 1);
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
            Clear Search
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
              borderRadius: 20,
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
                {(result.data ?? []).map((i, idx) => {
                  return <TableBody shop={i} editable={editable} key={idx} />;
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
