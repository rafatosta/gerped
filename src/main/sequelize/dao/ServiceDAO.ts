import Service from '@backend/models/Service';
import { Op } from 'sequelize'

class ServiceDAO {
  static async findAll(
    searchText: string,
    page: number
  ): Promise<{ data: Service[]; count: number }> {
    const limit = 15
    const offset = (page - 1) * limit

    let whereClause = {}
    if (searchText) {
      whereClause = {
        [Op.or]: [
          { description: { [Op.like]: `%${searchText}%` } },
        ]
      }
    }

    const [data, count] = await Promise.all([
      Service.findAll({
        where: whereClause,
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']],
        raw: true
      }),
      Service.count({ where: whereClause })
    ])

    return { data, count }
  }

  static async findById(id: number): Promise<Service | null> {
    return await Service.findByPk(id, { raw: true })
  }

  static async save(data: Service): Promise<Service | null> {
    if (data.id) {
      await ServiceDAO.update(data.id, data)
      return ServiceDAO.findById(data.id)
    }

    return await ServiceDAO.create(data)
  }

  static async create(data: Service): Promise<Service> {
    return await Service.create(data, { raw: true })
  }

  static async update(id: number, data: Partial<Service>): Promise<[number]> {
    return await Service.update(data, { where: { id } })
  }

  static async delete(id: number): Promise<number> {
    return await Service.destroy({ where: { id } })
  }
}

export default ServiceDAO
