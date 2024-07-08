import { ipcMain } from 'electron'
import ClientDAO from './sequelize/dao/ClientDAO'
import OrderDAO from './sequelize/dao/OrderDAO'
import ServiceDAO from './sequelize/dao/ServiceDAO'
import TaskDAO from './sequelize/dao/TaskDAO'

/* clients */
ipcMain.handle('client:findAll', async (_, searchText, page) => {
  return ClientDAO.findAll(searchText, page)
})

ipcMain.handle('client:findById', async (_, id) => {
  return ClientDAO.findById(id)
})

ipcMain.handle('client:save', async (_, data) => {
  return ClientDAO.save(data)
})

ipcMain.handle('client:delete', async (_, id) => {
  return ClientDAO.delete(id)
})

/* Services */
ipcMain.handle('service:findAll', async (_, searchText, page) => {
  return ServiceDAO.findAll(searchText, page)
})

ipcMain.handle('service:findById', async (_, id) => {
  return ServiceDAO.findById(id)
})

ipcMain.handle('service:save', async (_, data) => {
  return ServiceDAO.save(data)
})

ipcMain.handle('service:delete', async (_, id) => {
  return ServiceDAO.delete(id)
})

/* Orders */
ipcMain.handle('order:findAll', async (_, searchText, page, filterStatus) => {
  return OrderDAO.findAll(searchText, page, filterStatus)
})

ipcMain.handle('order:findAllPeding', async (_) => {
  return OrderDAO.findAllPeding()
})

ipcMain.handle('order:findById', async (_, id) => {
  return OrderDAO.findById(id)
})

ipcMain.handle(
  'order:findOrdersByClientId',
  async (_, idClient, searchText, page, filterStatus) => {
    return OrderDAO.findOrdersByClientId(idClient, searchText, page, filterStatus)
  }
)

ipcMain.handle('order:save', async (_, data) => {
  return OrderDAO.save(data)
})

ipcMain.handle('order:delete', async (_, id) => {
  return OrderDAO.delete(id)
})

/* Tasks */
ipcMain.handle('task:getTasksByOrderDeliveryDate', async (_) => {
  return TaskDAO.getTasksByOrderDeliveryDate()
})

ipcMain.handle('task:update', async (_, data) => {
  return TaskDAO.update(data)
})
