import { Op } from 'sequelize';
import Client, { ClientAttributes } from '../models/Client';
import { IAppError, SQLiteError } from '@backend/interface/IAppError';

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

    if (page && page > 0) {
      offset = (page - 1) * limit;
      options.limit = limit;
      options.offset = offset;
    }

    if (searchText) {
      options.where = {
        [Op.or]: [
          { name: { [Op.like]: `%${searchText}%` } },
          { phone: { [Op.like]: `%${searchText}%` } },
          { course: { [Op.like]: `%${searchText}%` } }
        ]
      };
    }

    try {
      const [data, count] = await Promise.all([
        Client.findAll(options),
        Client.count({ where: options.where })
      ]);
      return { data, count };
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      const appError: IAppError = {
        message: 'Não foi possível buscar os clientes',
        code: 'ERRO_BUSCA_CLIENTES',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async findById(id: number): Promise<Client | null> {
    try {
      const client = await Client.findByPk(id, { raw: true });
      if (!client) {
        const notFoundError: IAppError = {
          message: 'Cliente não encontrado',
          code: 'CLIENTE_NAO_ENCONTRADO',
        };
        throw new Error(JSON.stringify(notFoundError));
      }
      return client;
    } catch (error) {
      console.error('Erro ao buscar cliente por ID:', error);
      const appError: IAppError = {
        message: 'Não foi possível buscar o cliente',
        code: 'ERRO_BUSCA_CLIENTE',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async save(data: Client): Promise<Client | ClientAttributes | null> {
    try {
      if (data.id) {
        await ClientDAO.update(data.id, data);
        return await ClientDAO.findById(data.id);
      }
      return await ClientDAO.create(data);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      const appError: IAppError = {
        message: 'Não foi possível salvar o cliente',
        code: 'ERRO_SALVAR_CLIENTE',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async create(data: Client): Promise<Client> {
    try {
      return await Client.create(data, { raw: true });
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      const appError: IAppError = {
        message: 'Não foi possível criar o cliente',
        code: 'ERRO_CRIAR_CLIENTE',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async update(id: number, data: Partial<Client>): Promise<number> {
    try {
      const [affectedRows] = await Client.update(data, { where: { id } });
      if (affectedRows === 0) {
        const notFoundError: IAppError = {
          message: 'Cliente não encontrado para atualização',
          code: 'CLIENTE_NAO_ENCONTRADO',
        };
        throw new Error(JSON.stringify(notFoundError));
      }
      return affectedRows;
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      const appError: IAppError = {
        message: 'Não foi possível atualizar o cliente',
        code: 'ERRO_ATUALIZAR_CLIENTE',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async delete(id: number): Promise<number> {
    try {
      const deletedRows = await Client.destroy({ where: { id } });
      if (deletedRows === 0) {
        const notFoundError: IAppError = {
          message: 'Cliente não encontrado para exclusão',
          code: 'CLIENTE_NAO_ENCONTRADO',
        };
        throw new Error(JSON.stringify(notFoundError));
      }
      return deletedRows;
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      const appError: IAppError = {
        message: 'Não foi possível deletar o cliente',
        code: 'ERRO_DELECAO_CLIENTE',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }
}

export default ClientDAO;
