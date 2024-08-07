import Task from '@backend/models/Task'
import { parseError } from '@renderer/utils/parseError'

class TaskIPC {
  static async findAll(): Promise<Task[]> {
    try {
      return await window.electron.ipcRenderer.invoke('task:getTasksByOrderDeliveryDate')
    } catch (err) {
      throw parseError(err)
    }
  }

  static async update(data: Task): Promise<Task> {
    try {
      return await window.electron.ipcRenderer.invoke('task:update', data)
    } catch (err) {
      throw parseError(err)
    }
  }
}

export default TaskIPC
