import { Dispatch, SetStateAction, useEffect } from 'react';
import { Observable } from 'rxjs';
import { Shop } from '../../schemas/AddShopSchema';

/**
 * 
 * Hook for managing subscriptions of obeservables
 * 
 * @param observable Observable<any | undefined>
 * @param setter  Dispatch<
    SetStateAction<{
      data?: Array<Shop>;
      hasNextPage?: boolean;
    }>
  >
 */
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
    // Setting state is difficult inside a subscription, so this is done every time a subscription changes
  }, [observable, setter]);
};

export default useObservable;
