import { useCallback, useEffect, useState } from 'react';

export function useBackendEntity<T>(
  findAll: (...args: any[]) => Promise<{ data: T[]; count: number }>,
  findById: (id: string) => Promise<T>,
  save: (data: T) => Promise<T>,
  remove: (id: number) => Promise<T>,
  searchText: string = '',
  currentPage?: number,
  ...extraParams: any[]
) {
  const [data, setData] = useState<T[]>([]);
  const [count, setCount] = useState<number>(0);

  const fetchData = useCallback(async () => {
    if (currentPage !== undefined) {
      try {
        const { data, count } = await findAll(searchText, currentPage, ...extraParams);
        setCount(count);
        setData(data);
      } catch (err) {
        console.log('Erro:', err);
      }
    }
  }, [searchText, currentPage, findAll, ...extraParams]);

  const saveData = useCallback(
    async (data: T): Promise<T> => {
      try {
        const resData = await save(data);
        fetchData();
        return resData;
      } catch (err) {
        alert(`Erro: ${err}`);
      }
      return {} as T;
    },
    [fetchData, save]
  );

  const findByIdData = useCallback(
    async (id: string): Promise<T> => {
      try {
        return await findById(id);
      } catch (err) {
        alert(`Erro: ${err}`);
      }
      return {} as T;
    }, [findById]);

  const removeData = useCallback(
    async (id: number): Promise<T> => {
      try {
        const resData = await remove(id);
        fetchData();
        return resData;
      } catch (err) {
        alert(`Erro: ${err}`);
      }
      return {} as T;
    }, [fetchData, remove]);

  useEffect(() => {
    if (currentPage !== undefined) {
      fetchData();
    }
  }, [fetchData, searchText, currentPage]);

  return { data, count, save: saveData, findById: findByIdData, remove: removeData };
}
