import { Op } from 'sequelize';
import Client from '../models/Client';

class ClientDAO {
    static async findAll(searchText: string, page: number): Promise<Client[]> {
        const limit = 15;
        const offset = (page - 1) * limit;

        let whereClause = {};
        if (searchText) {
            whereClause = {
                [Op.or]: [
                    { name: { [Op.like]: `%${searchText}%` } },
                    { phone: { [Op.like]: `%${searchText}%` } },
                    { course: { [Op.like]: `%${searchText}%` } },
                ],
            };
        }

        return await Client.findAll({
            where: whereClause,
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
            raw: true
        });
    }

    static async findById(id: number): Promise<Client | null> {
        return await Client.findByPk(id, { raw: true});
    }

    static async count(searchText: string): Promise<number> {
        let whereClause = {};
        if (searchText) {
            whereClause = {
                [Op.or]: [
                    { name: { [Op.like]: `%${searchText}%` } },
                    { phone: { [Op.like]: `%${searchText}%` } },
                    { course: { [Op.like]: `%${searchText}%` } },
                ],
            };
        }
        return Client.count({ where: whereClause });
    }

    static async save(data: Client): Promise<Client | null> {
        if (data.id) {
          await ClientDAO.update(data.id, data);
          return Client.findByPk(data.id);
        } else {
          const newCliente = await ClientDAO.create(data);
          return newCliente;
        }
      }

    static async create(data: Client): Promise<Client> {
        return await Client.create(data, {raw:true});
    }

    static async update(id: number, data: Client): Promise<[number, Client[]]> {
        return await Client.update(data, { where: { id } });
    }

    static async delete(id: number): Promise<number> {
        return await Client.destroy({ where: { id } });
    }
}

export default ClientDAO;
