import Client from '@backend/models/Client'
import { parseError } from '@renderer/utils/parseError'

class ClientIPC {
  static async findAll(
    searchText?: string,
    currentPage?: number
  ): Promise<{ data: Client[]; count: number }> {
    try {
      return await window.electron.ipcRenderer.invoke('client:findAll', searchText, currentPage)
    } catch (err) {
      throw parseError(err)
    }
  }

  static async findById(id: string): Promise<Client> {
    try {
      return await window.electron.ipcRenderer.invoke('client:findById', id)
    } catch (err) {
      throw parseError(err)
    }
  }

  static async save(client: Client): Promise<Client> {
    try {
      return await window.electron.ipcRenderer.invoke('client:save', client)
    } catch (err) {
      throw parseError(err)
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      await window.electron.ipcRenderer.invoke('client:delete', id)
    } catch (err) {
      throw parseError(err)
    }
  }
}

export default ClientIPC
