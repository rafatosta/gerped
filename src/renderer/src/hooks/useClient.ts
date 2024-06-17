import Client from '@backend/models/Client';
import { useCallback, useEffect, useState } from 'react';

function findAllFromIPC(searchText: string, currentPage: number): Promise<Client[]> {
  return window.electron.ipcRenderer.invoke('client:findAll', searchText, currentPage);
}

function findByIdFromIPC(id: string): Promise<Client> {
  return window.electron.ipcRenderer.invoke('client:findById', id);
}

function countFromIPC(searchText: string): Promise<number> {
  return window.electron.ipcRenderer.invoke('client:count', searchText);
}

function saveFromIPC(client: Client): Promise<Client> {
  return window.electron.ipcRenderer.invoke('client:save', client);
}

export function useClient(searchText: string = "", currentPage?: number) {
  const [clients, setClients] = useState<Client[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const fetchClients = useCallback(async () => {
    if (currentPage !== undefined) {
      try {
        const count = await countFromIPC(searchText);
        const data = await findAllFromIPC(searchText, currentPage);

        setTotalRecords(count);
        setClients(data);

      } catch (err) {
        console.log('Erro:', err);
      }
    }
  }, [searchText, currentPage]);

  const saveClient = useCallback(async (client: Client): Promise<Client> => {
    try {
      const novoCliente = await saveFromIPC(client);
      fetchClients();
      return novoCliente;
    } catch (err) {
      alert(`Erro: ${err}}`);
    }

    return {} as Client;
  }, [fetchClients]);

  const findByIdClient = useCallback(async (id: string): Promise<Client> => {
    try {
      return await findByIdFromIPC(id);
    } catch (err) {
      alert(`Erro: ${err}}`);
    }
    return {} as Client;
  }, []);

  useEffect(() => {
    if (currentPage !== undefined) {
      fetchClients();
    }
  }, [fetchClients, searchText, currentPage]);

  return { clients, totalRecords, saveClient, findByIdClient };
}
