import { combine } from 'zustand/middleware';
import { persist } from '.';
import create from 'zustand';

export interface Shop {
  dateTime: Date;
  name: string;
  store: string;
  storeLink: string;
  id: string;
}

const defaultState = {
  purchaseData: [] as Array<Shop>,
};

export const useShopList = create(
  persist(
    {
      key: 'shop',
    },
    combine(defaultState, (set) => ({
      addProduct: (payload: Shop) => {
        set(({ purchaseData }) => {
          return {
            purchaseData: [...purchaseData, payload],
          };
        });
      },
      removeProduct: (payload: Shop) => {
        set(({ purchaseData }) => {
          const newResult = purchaseData.filter((i) => i.id === payload.id);
          return {
            purchaseData: [...newResult],
          };
        });
      },
    }))
  )
);
