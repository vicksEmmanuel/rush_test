import { Dispatch, SetStateAction, useEffect } from 'react';
import { Observable } from 'rxjs';
import { Shop } from '../../schemas/AddShopSchema';

const useObservable = (
  observable: Observable<any | undefined>,
  setter: Dispatch<
    SetStateAction<{
      data?: Array<Shop>;
      hasNextPage?: boolean;
    }>
  >
) => {
  useEffect(() => {
    let subscription = observable.subscribe((result) => {
      setter(result);
    });

    return () => subscription.unsubscribe();
  }, [observable, setter]);
};

export default useObservable;
