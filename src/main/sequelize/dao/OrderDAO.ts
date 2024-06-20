import { Op } from 'sequelize'
import Order from '../models/Order'
import Service from '@backend/models/Service';
import Client from '@backend/models/Client';
import { OrderStatus } from '@backend/enums/OrderStatus';

class OrderDAO {
  static async findAll(
    searchText: string,
    page: number,
    filterStatus: OrderStatus
  ): Promise<{ data: Order[]; count: number }> {
    const limit = 15
    const offset = (page - 1) * limit

    let whereClause: any = {}
    if (searchText) {
      whereClause = {
        [Op.or]: [
          { theme: { [Op.like]: `%${searchText}%` } },
          { '$Client.name$': { [Op.like]: `%${searchText}%` } }
        ]
      }
    }

    if (filterStatus && filterStatus != OrderStatus.TODOS) {
      whereClause.status = filterStatus;
    }

    const [data, count] = await Promise.all([
      Order.findAll({
        where: whereClause,
        limit: limit,
        offset: offset,
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
      }),
      Order.count({
        where: whereClause,
        include: [Client]
      })
    ]);

    return { data, count }
  }

  static async findById(id: number): Promise<Order | null> {
    return await Order.findByPk(id, { raw: true, nest: true })
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
    if (data.id) {
      await OrderDAO.update(data.id, data)
      return OrderDAO.findById(data.id)
    }

    return await OrderDAO.create(data)
  }

  static async create(data: Order): Promise<Order> {
    return await Order.create(data, { raw: true })
  }

  static async update(id: number, data: Partial<Order>): Promise<[number]> {
    return await Order.update(data, { where: { id } })
  }

  static async delete(id: number): Promise<number> {
    return await Order.destroy({ where: { id } })
  }
}

export default OrderDAO
