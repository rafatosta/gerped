import Client from '../models/Client';

class ClientDAO {
    static async findAll(): Promise<Client[]> {
        return await Client.findAll();
    }

    static async findById(id: number): Promise<Client | null> {
        return await Client.findByPk(id);
    }

    static async create(data: Partial<Client>): Promise<Client> {
        return await Client.create(data);
    }

    static async update(id: number, data: Partial<Client>): Promise<[number, Client[]]> {
        return await Client.update(data, { where: { id } });
    }

    static async delete(id: number): Promise<number> {
        return await Client.destroy({ where: { id } });
    }
}

export default ClientDAO;
