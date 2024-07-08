import { OrderStatus } from '@backend/enums/OrderStatus'
import { IAppError, SQLiteError } from '@backend/interface/IAppError'
import Client from '@backend/models/Client'
import Order from '@backend/models/Order'
import Service from '@backend/models/Service'
import Task from '@backend/models/Task'
import { Op, Sequelize } from 'sequelize'

class TaskDAO {
  static async getTasksByOrderDeliveryDate(): Promise<Task[]> {
    try {
      const tasks = await Task.findAll({
        include: {
          model: Order,
          as: 'Order',
          where: {
            status: { [Op.is]: OrderStatus.ATIVO }
          },
          include: [
            {
              model: Client,
              attributes: ['id', 'name']
            },
            {
              model: Service,
              attributes: ['description']
            }
          ]
        },
        where: {
          conclusionDate: {
            [Op.is]: undefined
          }
        },
        order: [[Sequelize.col('Order.deliveryDate'), 'ASC']], // Order by Order.deliveryDate
        raw: true,
        nest: true
      })

      return tasks as Task[]
    } catch (error) {
      console.error('Error fetching tasks:', error)
      throw error // Re-throw for handling at a higher level
    }
  }

  static async update(data: Partial<Task>) {
    try {
      const id = data.id
      const [updateCount] = await Task.update(data, { where: { id } })

      // Verifica se a atualização foi bem-sucedida
      if (updateCount === 0) {
        // Se nenhum registro foi afetado pela atualização, lança um erro
        const notFoundError: IAppError = {
          message: `Tarefa com id ${id} não encontrado`,
          code: 'TAREFA_NAO_ENCONTRADO'
        }
        throw new Error(JSON.stringify(notFoundError))
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error) // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível atualizar a tarefa',
        code: 'ERRO_ATUALIZAR_TAREFA',
        details: error as SQLiteError // Detalhes específicos do erro, se disponíveis
      }
      throw new Error(JSON.stringify(appError)) // Lança o erro como uma exceção
    }
  }
}

export default TaskDAO
