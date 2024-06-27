import { IAppError, SQLiteError } from '@backend/interface/IAppError'; // Importa interfaces de erro personalizadas
import Service from '@backend/models/Service'; // Importa o modelo de Service
import { Op } from 'sequelize'; // Importa operadores Sequelize para consultas complexas

// Classe DAO para operações relacionadas a Service
class ServiceDAO {
  // Método estático para buscar todos os serviços com paginação e filtro opcional por texto
  static async findAll(
    searchText?: string, // Texto de busca opcional
    page?: number // Número da página opcional
  ): Promise<{ data: Service[]; count: number }> {
    const limit = 15; // Limite de registros por página
    let offset = 0; // Offset inicial
    let options: any = {
      where: {}, // Condições de busca inicialmente vazias
      order: [['createdAt', 'DESC']], // Ordenação por data de criação descendente
      raw: true // Retorna os resultados como objetos JavaScript simples
    };

    // Configuração de paginação se o número da página for especificado e maior que zero
    if (page && page > 0) {
      offset = (page - 1) * limit; // Calcula o offset com base na página
      options.limit = limit; // Define o limite de registros
      options.offset = offset; // Define o offset
    }

    // Configuração de busca por texto se houver um texto de busca especificado
    if (searchText) {
      options.where = {
        [Op.or]: [
          { description: { [Op.like]: `%${searchText}%` } }, // Busca por descrição similar ao texto
        ]
      };
    }

    try {
      // Executa as consultas de busca de serviços e contagem de registros
      const [data, count] = await Promise.all([
        Service.findAll(options), // Busca os serviços com as opções configuradas
        Service.count({ where: options.where }) // Conta o número total de registros com as mesmas condições
      ]);

      return { data, count }; // Retorna os dados e a contagem de registros encontrados
    } catch (error) {
      console.error('Erro ao buscar serviços:', error); // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível buscar os serviços',
        code: 'ERRO_BUSCA_SERVICOS',
        details: error as SQLiteError, // Detalhes específicos do erro, se disponíveis
      };
      throw new Error(JSON.stringify(appError)); // Lança o erro como uma exceção
    }
  }

  // Método estático para buscar um serviço pelo ID
  static async findById(id: number): Promise<Service | null> {
    try {
      const service = await Service.findByPk(id, { raw: true }); // Busca o serviço pelo ID

      // Verifica se o serviço foi encontrado
      if (!service) {
        // Se o serviço não for encontrado, lança um erro personalizado
        const notFoundError: IAppError = {
          message: 'Serviço não encontrado',
          code: 'SERVICO_NAO_ENCONTRADO',
        };
        throw new Error(JSON.stringify(notFoundError));
      }

      return service; // Retorna o serviço encontrado
    } catch (error) {
      console.error('Erro ao buscar serviço por ID:', error); // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível buscar o serviço',
        code: 'ERRO_BUSCA_SERVICO',
        details: error as SQLiteError, // Detalhes específicos do erro, se disponíveis
      };
      throw new Error(JSON.stringify(appError)); // Lança o erro como uma exceção
    }
  }

  // Método estático para salvar um serviço (inserir ou atualizar)
  static async save(data: Service): Promise<Service | null> {
    try {
      // Verifica se o serviço já possui um ID
      if (data.id) {
        await ServiceDAO.update(data.id, data); // Atualiza o serviço existente
        return ServiceDAO.findById(data.id); // Retorna o serviço atualizado
      }

      return await ServiceDAO.create(data); // Cria um novo serviço
    } catch (error) {
      console.error('Erro ao salvar serviço:', error); // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível salvar o serviço',
        code: 'ERRO_SALVAR_SERVICO',
        details: error as SQLiteError, // Detalhes específicos do erro, se disponíveis
      };
      throw new Error(JSON.stringify(appError)); // Lança o erro como uma exceção
    }
  }

  // Método estático para criar um novo serviço
  static async create(data: Service): Promise<Service> {
    try {
      return await Service.create(data, { raw: true }); // Cria o serviço com os dados fornecidos
    } catch (error) {
      console.error('Erro ao criar serviço:', error); // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível criar o serviço',
        code: 'ERRO_CRIAR_SERVICO',
        details: error as SQLiteError, // Detalhes específicos do erro, se disponíveis
      };
      throw new Error(JSON.stringify(appError)); // Lança o erro como uma exceção
    }
  }

  // Método estático para atualizar um serviço existente pelo ID
  static async update(id: number, data: Partial<Service>): Promise<[number]> {
    try {
      const [updateCount] = await Service.update(data, { where: { id } }); // Atualiza o serviço pelo ID

      // Verifica se a atualização foi bem-sucedida
      if (updateCount === 0) {
        // Se nenhum registro foi afetado pela atualização, lança um erro
        const notFoundError: IAppError = {
          message: `Serviço com id ${id} não encontrado`,
          code: 'SERVICO_NAO_ENCONTRADO',
        };
        throw new Error(JSON.stringify(notFoundError));
      }

      return [updateCount]; // Retorna o número de registros atualizados
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error); // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível atualizar o serviço',
        code: 'ERRO_ATUALIZAR_SERVICO',
        details: error as SQLiteError, // Detalhes específicos do erro, se disponíveis
      };
      throw new Error(JSON.stringify(appError)); // Lança o erro como uma exceção
    }
  }

  // Método estático para excluir um serviço pelo ID
  static async delete(id: number): Promise<number> {
    try {
      const deletedRows = await Service.destroy({ where: { id } }); // Exclui o serviço pelo ID

      // Verifica se algum registro foi afetado pela exclusão
      if (deletedRows === 0) {
        // Se nenhum serviço foi excluído, lança um erro
        const notFoundError: IAppError = {
          message: `Serviço com id ${id} não encontrado para exclusão`,
          code: 'SERVICO_NAO_ENCONTRADO',
        };
        throw new Error(JSON.stringify(notFoundError));
      }

      return deletedRows; // Retorna o número de registros excluídos
    } catch (error) {
      console.error('Erro ao deletar serviço:', error); // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível deletar o serviço',
        code: 'ERRO_DELECAO_SERVICO',
        details: error as SQLiteError, // Detalhes específicos do erro, se disponíveis
      };
      throw new Error(JSON.stringify(appError)); // Lança o erro como uma exceção
    }
  }
}

export default ServiceDAO; // Exporta a classe ServiceDAO
