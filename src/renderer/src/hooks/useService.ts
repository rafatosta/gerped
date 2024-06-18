import Service from '@backend/models/Service';
import { useCallback, useEffect, useState } from 'react'

function findAllFromIPC(
  searchText: string,
  currentPage: number
): Promise<{ data: Service[]; count: number }> {
  return window.electron.ipcRenderer.invoke('service:findAll', searchText, currentPage)
}

function findByIdFromIPC(id: string): Promise<Service> {
  return window.electron.ipcRenderer.invoke('service:findById', id)
}

function saveFromIPC(data: Service): Promise<Service> {
  return window.electron.ipcRenderer.invoke('service:save', data)
}

function deleteFromIPC(id: number): Promise<Service> {
  return window.electron.ipcRenderer.invoke('service:delete', id)
}

export function useService(searchText: string = '', currentPage?: number) {
  const [data, setData] = useState<Service[]>([])
  const [count, setCount] = useState<number>(0)

  const fetchData = useCallback(async () => {
    if (currentPage !== undefined) {
      try {
        const { data, count } = await findAllFromIPC(searchText, currentPage)

        setCount(count)
        setData(data)
      } catch (err) {
        console.log('Erro:', err)
      }
    }
  }, [searchText, currentPage])

  const save = useCallback(
    async (data: Service): Promise<Service> => {
      try {
        const resData = await saveFromIPC(data)
        fetchData()
        return resData
      } catch (err) {
        alert(`Erro: ${err}}`)
      }
      return {} as Service
    },
    [fetchData]
  )

  const findById = useCallback(
    async (id: string): Promise<Service> => {
      try {
        return await findByIdFromIPC(id)
      } catch (err) {
        alert(`Erro: ${err}}`)
      }
      return {} as Service
    }, [])

  const remove = useCallback(async (id: number): Promise<Service> => {
    try {
      const resData = await deleteFromIPC(id)
      fetchData()
      return resData
    } catch (err) {
      alert(`Erro: ${err}}`)
    }
    return {} as Service
  }, [])

  useEffect(() => {
    if (currentPage !== undefined) {
      fetchData()
    }
  }, [fetchData, searchText, currentPage])

  return { data, count, save, findById, remove }
}
