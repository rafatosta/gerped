import Service from "@backend/models/Service";
import { parseError } from "@renderer/utils/parseError";

class ServiceIPC {

  static async findAll(searchText: string, currentPage: number): Promise<{ data: Service[]; count: number }> {
    try {
      return await window.electron.ipcRenderer.invoke('service:findAll', searchText, currentPage);
    } catch (err) {
      throw parseError(err);
    }
  }

  static async findById(id: string): Promise<Service> {
    try {
      return await window.electron.ipcRenderer.invoke('service:findById', id);
    } catch (err) {
      throw parseError(err);
    }
  }

  static async save(data: Service): Promise<Service> {
    try {
      return await window.electron.ipcRenderer.invoke('service:save', data);
    } catch (err) {
      throw parseError(err);
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      await window.electron.ipcRenderer.invoke('service:delete', id);
    } catch (err) {
      throw parseError(err);
    }
  }
}

export default ServiceIPC;
