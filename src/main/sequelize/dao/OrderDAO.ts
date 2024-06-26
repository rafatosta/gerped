import { Op, Transaction } from 'sequelize';
import Order from '../models/Order';
import Service from '@backend/models/Service';
import Client from '@backend/models/Client';
import { OrderStatus } from '@backend/enums/OrderStatus';
import Task from '@backend/models/Task';
import sequelize from '@backend/db';
import { IAppError, SQLiteError } from '@backend/interface/IAppError';

class OrderDAO {
  static async findAll(
    searchText?: string,
    page?: number,
    filterStatus?: OrderStatus
  ): Promise<{ data: Order[]; count: number }> {
    const limit = 15;
    let offset = 0;
    let whereClause: any = {};
    let options: any = {
      where: whereClause,
      order: [['createdAt', 'DESC']],
      raw: true,
      nest: true,
      include: [
        {
          model: Service,
          attributes: ['description']
        },
        {
          model: Client,
          attributes: ['name']
        }
      ]
    };

    if (page && page > 0) {
      offset = (page - 1) * limit;
      options.limit = limit;
      options.offset = offset;
    }

    if (searchText) {
      whereClause[Op.or] = [
        { theme: { [Op.like]: `%${searchText}%` } },
        { '$Client.name$': { [Op.like]: `%${searchText}%` } }
      ];
    }

    if (filterStatus && filterStatus !== OrderStatus.TODOS) {
      whereClause.status = filterStatus;
    }

    try {
      const [data, count] = await Promise.all([
        Order.findAll(options),
        Order.count({
          where: whereClause,
          include: [Client]
        })
      ]);
      return { data, count };
    } catch (error) {
      console.error('Erro ao buscar ordens:', error);
      const appError: IAppError = {
        message: 'Não foi possível buscar as ordens',
        code: 'ERRO_BUSCA_ORDENS',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async findById(id: number): Promise<Order | null> {
    try {
      const data = await Order.findByPk(
        id,
        {
          include: [
            {
              model: Client,
              attributes: ['id', 'name']
            },
            {
              model: Task
            }
          ]
        }
      );

      if (data) {
        return data.toJSON() as Order;
      } else {
        const notFoundError: IAppError = {
          message: 'Ordem não encontrada',
          code: 'ORDEM_NAO_ENCONTRADA',
        };
        throw new Error(JSON.stringify(notFoundError));
      }
    } catch (error) {
      console.error('Erro ao buscar ordem por ID:', error);
      const appError: IAppError = {
        message: 'Não foi possível buscar a ordem',
        code: 'ERRO_BUSCA_ORDEM',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async findOrdersByClientId(
    clientId: number,
    searchText: string,
    page: number,
    filterStatus: OrderStatus
  ): Promise<{ data: Order[]; count: number }> {
    const limit = 15;
    const offset = (page - 1) * limit;

    let whereClause: any = {
      idClient: clientId
    };

    if (searchText) {
      whereClause[Op.or] = [
        { theme: { [Op.like]: `%${searchText}%` } },
        { '$Service.description$': { [Op.like]: `%${searchText}%` } }
      ];
    }

    if (filterStatus && filterStatus !== OrderStatus.TODOS) {
      whereClause.status = filterStatus;
    }

    try {
      const [data, count] = await Promise.all([
        Order.findAll({
          where: whereClause,
          limit: limit,
          offset: offset,
          include: [{
            model: Service,
            attributes: ['description']
          }],
          raw: true,
          nest: true,
        }),
        Order.count({
          where: whereClause,
          include: [{
            model: Service,
            attributes: ['description']
          }],
        })
      ]);

      return { data, count };
    } catch (error) {
      console.error('Erro ao buscar ordens por ID do cliente:', error);
      const appError: IAppError = {
        message: 'Não foi possível buscar as ordens do cliente',
        code: 'ERRO_BUSCA_ORDENS_CLIENTE',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async save(data: Order): Promise<Order | null> {
    const transaction = await sequelize.transaction();
    try {
      let order: Order;

      if (data.id) {
        order = await OrderDAO.update(data.id, data, transaction);
      } else {
        order = await OrderDAO.create(data, transaction);
      }

      await transaction.commit();
      return order;
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao salvar ordem:', error);
      const appError: IAppError = {
        message: 'Não foi possível salvar a ordem',
        code: 'ERRO_SALVAR_ORDEM',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async create(data: Order, transaction: Transaction): Promise<Order> {
    try {
      const order = await Order.create(data, { transaction });

      if (data.Tasks && data.Tasks.length > 0) {
        for (const task of data.Tasks) {
          await Task.create({ ...task, idOrder: order.id }, { transaction });
        }
      }

      return order;
    } catch (error) {
      console.error('Erro ao criar ordem:', error);
      const appError: IAppError = {
        message: 'Não foi possível criar a ordem',
        code: 'ERRO_CRIAR_ORDEM',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async update(id: number, data: Partial<Order>, transaction: Transaction): Promise<Order> {
    try {
      const [updateCount] = await Order.update(data, { where: { id }, transaction });

      if (updateCount === 0) {
        const notFoundError: IAppError = {
          message: `Ordem com id ${id} não encontrada`,
          code: 'ORDEM_NAO_ENCONTRADA',
        };
        throw new Error(JSON.stringify(notFoundError));
      }

      await Task.destroy({ where: { idOrder: id }, transaction });
      if (data.Tasks && data.Tasks.length > 0) {
        await Task.bulkCreate(data.Tasks, { transaction });
      }

      const updatedOrder = await Order.findByPk(id, { include: [Client, Task], transaction });

      if (!updatedOrder) {
        const notFoundError: IAppError = {
          message: `Ordem com id ${id} não encontrada após atualização`,
          code: 'ORDEM_NAO_ENCONTRADA',
        };
        throw new Error(JSON.stringify(notFoundError));
      }

      return updatedOrder.toJSON() as Order;
    } catch (error) {
      console.error('Erro ao atualizar ordem:', error);
      const appError: IAppError = {
        message: 'Não foi possível atualizar a ordem',
        code: 'ERRO_ATUALIZAR_ORDEM',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async delete(id: number): Promise<number> {
    try {
      const deletedRows = await Order.destroy({ where: { id } });
      if (deletedRows === 0) {
        const notFoundError: IAppError = {
          message: `Ordem com id ${id} não encontrada para exclusão`,
          code: 'ORDEM_NAO_ENCONTRADA',
        };
        throw new Error(JSON.stringify(notFoundError));
      }
      return deletedRows;
    } catch (error) {
      console.error('Erro ao deletar ordem:', error);
      const appError: IAppError = {
        message: 'Não foi possível deletar a ordem',
        code: 'ERRO_DELECAO_ORDEM',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }
}

export default OrderDAO;
