import { Op } from 'sequelize'
import Client, { ClientAttributes } from '../models/Client'

class ClientDAO {
  static async findAll(
    searchText?: string,
    page?: number
  ): Promise<{ data: Client[]; count: number }> {
    
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

    // Verifica se searchText está definido para construir a cláusula where
    if (searchText) {
      options.where = {
        [Op.or]: [
          { name: { [Op.like]: `%${searchText}%` } },
          { phone: { [Op.like]: `%${searchText}%` } },
          { course: { [Op.like]: `%${searchText}%` } }
        ]
      };
    }

    // Executa as consultas de forma assíncrona
    const [data, count] = await Promise.all([
      Client.findAll(options),
      Client.count({ where: options.where })
    ]);

    return { data, count };
  }

  static async findById(id: number): Promise<Client | null> {
    return await Client.findByPk(id, { raw: true })
  }

  static async save(data: Client): Promise<Client | ClientAttributes | null> {
    if (data.id) {
      await ClientDAO.update(data.id, data)
      return ClientDAO.findById(data.id)
    }

    return await ClientDAO.create(data)
  }

  static async create(data: Client): Promise<Client> {
    return await Client.create(data, { raw: true })
  }

  static async update(id: number, data: Partial<Client>): Promise<[number]> {
    return await Client.update(data, { where: { id } })
  }

  static async delete(id: number): Promise<number> {
    return await Client.destroy({ where: { id } })
  }
}

export default ClientDAO
