import Service from '@backend/models/Service';
import { useBackendEntity } from './useBackendEntity';

function findAllFromIPC(
  searchText: string,
  currentPage: number
): Promise<{ data: Service[]; count: number }> {
  return window.electron.ipcRenderer.invoke('service:findAll', searchText, currentPage);
}

function findByIdFromIPC(id: string): Promise<Service> {
  return window.electron.ipcRenderer.invoke('service:findById', id);
}

function saveFromIPC(data: Service): Promise<Service> {
  return window.electron.ipcRenderer.invoke('service:save', data);
}

function deleteFromIPC(id: number): Promise<Service> {
  return window.electron.ipcRenderer.invoke('service:delete', id);
}

export function useService(searchText: string = '', currentPage?: number) {
  
  return useBackendEntity<Service>(
    findAllFromIPC,
    findByIdFromIPC,
    saveFromIPC,
    deleteFromIPC,
    searchText,
    currentPage
  );
}
