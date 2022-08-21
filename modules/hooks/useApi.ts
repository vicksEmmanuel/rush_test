import { Query } from '../../pages/api/previousShoppingHistory';
import { RemoveQuery } from '../../pages/api/removeItem';
import { Shop } from '../../schemas/AddShopSchema';

/**
 * Hook that holds the api from the backend
 * @returns {fetchHistory: void, deleteItem: void, addShoppingList: void}
 */
const useApi = () => {
  const fetchHistory = async (e: Query) => {
    const url = `/api/previousShoppingHistory?limit=${e.limit}&pageNumber=${e.pageNumber}&store=${e.store}&name=${e.name}&startDate=${e.startDate}&endDate=${e.endDate}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
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
    const response = await fetch(url);
    await response.json();
    return e;
  };

  return {
    fetchHistory,
    deleteItem,
    addShoppingList,
  };
};

export default useApi;
