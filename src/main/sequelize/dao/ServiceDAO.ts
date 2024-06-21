import Service from '@backend/models/Service';
import { Op } from 'sequelize'

class ServiceDAO {
  static async findAll(
    searchText?: string,
    page?: number
  ): Promise<{ data: Service[]; count: number }> {

    const limit = 15;
    let offset = 0;
    let options: any = {
      where: {},
      order: [['createdAt', 'DESC']],
      raw: true
    };

    // Verifica se page está definido e maior que 0 para aplicar limit e offset
    if (page && page > 0) {
      offset = (page - 1) * limit;
      options.limit = limit;
      options.offset = offset;
    }

    // Verifica se page está definido e maior que 0 para aplicar limit e offset
    if (searchText) {
      options.where = {
        [Op.or]: [
          { description: { [Op.like]: `%${searchText}%` } },
        ]
      }
    }
    // Executa as consultas de forma assíncrona
    const [data, count] = await Promise.all([
      Service.findAll(options),
      Service.count({ where: options.where })
    ]);


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
