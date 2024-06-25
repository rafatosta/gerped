import { Op, Transaction } from 'sequelize'
import Order from '../models/Order'
import Service from '@backend/models/Service';
import Client from '@backend/models/Client';
import { OrderStatus } from '@backend/enums/OrderStatus';
import Task from '@backend/models/Task';
import sequelize from '@backend/db';

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

    // Verifica se page está definido e maior que 0 para aplicar limit e offset
    if (page && page > 0) {
      offset = (page - 1) * limit;
      options.limit = limit;
      options.offset = offset;
    }

    // Verifica se searchText está definido para construir a cláusula where
    if (searchText) {
      whereClause[Op.or] = [
        { theme: { [Op.like]: `%${searchText}%` } },
        { '$Client.name$': { [Op.like]: `%${searchText}%` } }
      ];
    }

    // Verifica se filterStatus está definido e diferente de OrderStatus.TODOS
    if (filterStatus && filterStatus != OrderStatus.TODOS) {
      whereClause.status = filterStatus;
    }

    // Executa as consultas de forma assíncrona
    const [data, count] = await Promise.all([
      Order.findAll(options),
      Order.count({
        where: whereClause,
        include: [Client]
      })
    ]);

    return { data, count };
  }

  static async findById(id: number): Promise<Order | null> {
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
      // Convertendo para JSON para obter um objeto simples
      return data.toJSON() as Order;
    }

    return null;
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
      throw error;
    }
  }

  static async create(data: Order, transaction: Transaction): Promise<Order> {
    const order = await Order.create(data, { transaction });

    if (data.Tasks && data.Tasks.length > 0) {
      for (const task of data.Tasks) {
        await Task.create({ ...task, idOrder: order.id }, { transaction });
      }
    }

    return order;
  }

  static async update(id: number, data: Partial<Order>, transaction: Transaction): Promise<Order> {
    const [updateCount] = await Order.update(data, { where: { id }, transaction });

    if (updateCount === 0) {
      throw new Error(`Order with id ${id} not found`);
    }

    await Task.destroy({ where: { idOrder: id }, transaction });
    if (data.Tasks && data.Tasks.length > 0) {
      await Task.bulkCreate(data.Tasks, { transaction });
    }

    const updatedOrder = await Order.findByPk(id, { include: [Client, Task], transaction });

    if (!updatedOrder) {
      throw new Error(`Order with id ${id} not found after update`);
    }

    return updatedOrder.toJSON() as Order;
  }

  static async delete(id: number): Promise<number> {
    return await Order.destroy({ where: { id } })
  }
}

export default OrderDAO
