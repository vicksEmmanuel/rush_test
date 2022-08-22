import fetch from 'isomorphic-fetch';
import { Query } from '../../pages/api/previousShoppingHistory';
import { RemoveQuery } from '../../pages/api/removeItem';
import { Shop } from '../../schemas/AddShopSchema';

/**
 * Hook that holds the api from the backend
 * @returns {fetchHistory: void, deleteItem: void, addShoppingList: void}
 */
const useApi = () => {
  const fetchApi = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const fetchHistory = async (e: Query) => {
    const url = `/api/previousShoppingHistory?limit=${e.limit}&pageNumber=${e.pageNumber}&store=${e.store}&name=${e.name}&startDate=${e.startDate}&endDate=${e.endDate}`;
    return await fetchApi(url);
  };

  const addShoppingList = async (e: Shop) => {
    const url = `/api/addShoppingList`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(e),
    });
    const data = await response.json();
    return data;
  };

  const deleteItem = async (e: RemoveQuery) => {
    const url = `/api/removeItem?id=${e.id}`;
    return await fetchApi(url);
  };

  return {
    fetchHistory,
    deleteItem,
    addShoppingList,
  };
};

export default useApi;
