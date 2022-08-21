import { Query } from '../../pages/api/previousShoppingHistory';
import { RemoveQuery } from '../../pages/api/removeItem';

const useApi = () => {
  const fetchHistory = async (e: Query) => {
    const url = `/api/previousShoppingHistory?limit=${e.limit}&pageNumber=${e.pageNumber}&store=${e.store}&name=${e.name}&startDate=${e.startDate}&endDate=${e.endDate}`;
    const response = await fetch(url);
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
  };
};

export default useApi;
