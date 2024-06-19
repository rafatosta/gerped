import Order from '@backend/models/Order'
import { useBackendEntity } from './useBackendEntity';
import { OrderStatus } from '@backend/enums/OrderStatus';

function findAllFromIPC(
  searchText: string,
  currentPage: number,
  filterStatus: OrderStatus
): Promise<{ data: Order[]; count: number }> {
  return window.electron.ipcRenderer.invoke('order:findAll', searchText, currentPage, filterStatus);
}

function findByIdFromIPC(id: string): Promise<Order> {
  return window.electron.ipcRenderer.invoke('order:findById', id)
}

function saveFromIPC(data: Order): Promise<Order> {
  return window.electron.ipcRenderer.invoke('order:save', data)
}

function deleteFromIPC(id: number): Promise<Order> {
  return window.electron.ipcRenderer.invoke('order:delete', id)
}

export function useOrder(searchText: string = '', currentPage?: number, filterStatus?: OrderStatus) {
  
  return useBackendEntity<Order>(
    findAllFromIPC,
    findByIdFromIPC,
    saveFromIPC,
    deleteFromIPC,
    searchText,
    currentPage,
    filterStatus //ExtraParams
  );
}