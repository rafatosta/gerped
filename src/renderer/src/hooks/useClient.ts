import Client from '@backend/models/Client'
import { useBackendEntity } from './useBackendEntity';

function findAllFromIPC(
  searchText: string,
  currentPage: number
): Promise<{ data: Client[]; count: number }> {
  return window.electron.ipcRenderer.invoke('client:findAll', searchText, currentPage);
}

function findByIdFromIPC(id: string): Promise<Client> {
  return window.electron.ipcRenderer.invoke('client:findById', id)
}

function saveFromIPC(client: Client): Promise<Client> {
  return window.electron.ipcRenderer.invoke('client:save', client)
}

function deleteFromIPC(id: number): Promise<Client> {
  return window.electron.ipcRenderer.invoke('client:delete', id)
}

export function useClient(searchText: string = '', currentPage?: number) {
  
  return useBackendEntity<Client>(
    findAllFromIPC,
    findByIdFromIPC,
    saveFromIPC,
    deleteFromIPC,
    searchText,
    currentPage
  );
}