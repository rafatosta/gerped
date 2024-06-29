import { OrderStatus } from "@backend/enums/OrderStatus";
import Order from "@backend/models/Order";
import { parseError } from "@renderer/utils/parseError";

class OrderIPC {

  static async findAll(
    searchText?: string,
    currentPage?: number,
    filterStatus?: OrderStatus
  ): Promise<{ data: Order[]; count: number }> {
    try {
      return await window.electron.ipcRenderer.invoke('order:findAll', searchText, currentPage, filterStatus);
    } catch (err) {
      throw parseError(err);
    }
  }

  static async findById(id: string): Promise<Order> {
    try {
      return await window.electron.ipcRenderer.invoke('order:findById', id);
    } catch (err) {
      throw parseError(err);
    }
  }

  static findOrdersByClientId(
    idClient: string,
    searchText: string,
    currentPage: number,
    filterStatus: OrderStatus
  ): Promise<{ data: Order[]; count: number }> {
    return window.electron.ipcRenderer.invoke('order:findOrdersByClientId', idClient, searchText, currentPage, filterStatus);
  }

  static async save(data: Order): Promise<Order> {
    try {
      return await window.electron.ipcRenderer.invoke('order:save', data);
    } catch (err) {
      throw parseError(err);
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      await window.electron.ipcRenderer.invoke('order:delete', id);
    } catch (err) {
      throw parseError(err);
    }
  }
}

export default OrderIPC;
