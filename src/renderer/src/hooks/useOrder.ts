import Order from '@backend/models/Order';
import { useBackendEntity } from './useBackendEntity';
import { OrderStatus } from '@backend/enums/OrderStatus';
import { useCallback } from 'react';

function findAllFromIPC(
  searchText: string,
  currentPage: number,
  filterStatus: OrderStatus
): Promise<{ data: Order[]; count: number }> {
  return window.electron.ipcRenderer.invoke('order:findAll', searchText, currentPage, filterStatus);
}

function findByIdFromIPC(id: string): Promise<Order> {
  return window.electron.ipcRenderer.invoke('order:findById', id);
}

function saveFromIPC(data: Order): Promise<Order> {
  return window.electron.ipcRenderer.invoke('order:save', data);
}

function deleteFromIPC(id: number): Promise<Order> {
  return window.electron.ipcRenderer.invoke('order:delete', id);
}

function findOrdersByClientIdFromIPC(
  idClient: string,
  searchText: string,
  currentPage: number,
  filterStatus: OrderStatus
): Promise<{ data: Order[]; count: number }> {
  return window.electron.ipcRenderer.invoke('order:findOrdersByClientId', idClient, searchText, currentPage, filterStatus);
}

export function useOrder(searchText?: string, currentPage?: number, filterStatus?: OrderStatus) {
  const { data, count, save, findById, remove, setData, setCount } = useBackendEntity<Order>(
    findAllFromIPC,
    findByIdFromIPC,
    saveFromIPC,
    deleteFromIPC,
    searchText,
    currentPage,
    filterStatus
  );

  const findOrdersByClientId = useCallback(
    async (idClient: string, searchText: string, currentPage: number, filterStatus: OrderStatus) => {
      try {
        const { data, count } = await findOrdersByClientIdFromIPC(idClient, searchText, currentPage, filterStatus);
        setData(data); // Atualiza os dados com os resultados de findOrdersByClientIdFromIPC
        setCount(count); // Atualiza a contagem com os resultados de findOrdersByClientIdFromIPC
      } catch (err) {
        console.log('Erro:', err);
      }
    },
    [setData, setCount] // Inclui setData e setCount como dependências
  );

  return { data, count, save, findById, remove, findOrdersByClientId };
}
