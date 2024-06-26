import { IAppError, SQLiteError } from '@backend/interface/IAppError';
import Service from '@backend/models/Service';
import { Op } from 'sequelize';

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

    if (page && page > 0) {
      offset = (page - 1) * limit;
      options.limit = limit;
      options.offset = offset;
    }

    if (searchText) {
      options.where = {
        [Op.or]: [
          { description: { [Op.like]: `%${searchText}%` } },
        ]
      }
    }

    try {
      const [data, count] = await Promise.all([
        Service.findAll(options),
        Service.count({ where: options.where })
      ]);
      return { data, count };
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      const appError: IAppError = {
        message: 'Não foi possível buscar os serviços',
        code: 'ERRO_BUSCA_SERVICOS',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async findById(id: number): Promise<Service | null> {
    try {
      const service = await Service.findByPk(id, { raw: true });

      if (!service) {
        const notFoundError: IAppError = {
          message: 'Serviço não encontrado',
          code: 'SERVICO_NAO_ENCONTRADO',
        };
        throw new Error(JSON.stringify(notFoundError));
      }

      return service;
    } catch (error) {
      console.error('Erro ao buscar serviço por ID:', error);
      const appError: IAppError = {
        message: 'Não foi possível buscar o serviço',
        code: 'ERRO_BUSCA_SERVICO',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async save(data: Service): Promise<Service | null> {
    try {
      if (data.id) {
        await ServiceDAO.update(data.id, data);
        return ServiceDAO.findById(data.id);
      }

      return await ServiceDAO.create(data);
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      const appError: IAppError = {
        message: 'Não foi possível salvar o serviço',
        code: 'ERRO_SALVAR_SERVICO',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async create(data: Service): Promise<Service> {
    try {
      return await Service.create(data, { raw: true });
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
      const appError: IAppError = {
        message: 'Não foi possível criar o serviço',
        code: 'ERRO_CRIAR_SERVICO',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async update(id: number, data: Partial<Service>): Promise<[number]> {
    try {
      const [updateCount] = await Service.update(data, { where: { id } });

      if (updateCount === 0) {
        const notFoundError: IAppError = {
          message: `Serviço com id ${id} não encontrado`,
          code: 'SERVICO_NAO_ENCONTRADO',
        };
        throw new Error(JSON.stringify(notFoundError));
      }

      return [updateCount];
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      const appError: IAppError = {
        message: 'Não foi possível atualizar o serviço',
        code: 'ERRO_ATUALIZAR_SERVICO',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }

  static async delete(id: number): Promise<number> {
    try {
      const deletedRows = await Service.destroy({ where: { id } });

      if (deletedRows === 0) {
        const notFoundError: IAppError = {
          message: `Serviço com id ${id} não encontrado para exclusão`,
          code: 'SERVICO_NAO_ENCONTRADO',
        };
        throw new Error(JSON.stringify(notFoundError));
      }

      return deletedRows;
    } catch (error) {
      console.error('Erro ao deletar serviço:', error);
      const appError: IAppError = {
        message: 'Não foi possível deletar o serviço',
        code: 'ERRO_DELECAO_SERVICO',
        details: error as SQLiteError,
      };
      throw new Error(JSON.stringify(appError));
    }
  }
}

export default ServiceDAO;