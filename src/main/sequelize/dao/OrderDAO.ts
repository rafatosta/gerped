import { Op, Transaction } from 'sequelize';
import Order from '../models/Order'; // Importa o modelo de Order
import Service from '@backend/models/Service'; // Importa o modelo de Service
import Client from '@backend/models/Client'; // Importa o modelo de Client
import { OrderStatus } from '@backend/enums/OrderStatus'; // Importa enum de status de ordem
import Task from '@backend/models/Task'; // Importa o modelo de Task
import sequelize from '@backend/db'; // Importa a instância do Sequelize
import { IAppError, SQLiteError } from '@backend/interface/IAppError'; // Importa interfaces de erro

// Classe DAO para operações relacionadas a Order
class OrderDAO {
  // Método estático para buscar todas as ordens com paginação e filtros opcionais
  static async findAll(
    searchText?: string,
    page?: number,
    filterStatus?: OrderStatus
  ): Promise<{ data: Order[]; count: number }> {
    const limit = 15; // Limite de registros por página
    let offset = 0; // Offset inicial
    let whereClause: any = {}; // Clausula where inicial vazia
    let options: any = {
      where: whereClause, // Condições de busca
      order: [['deliveryDate', 'DESC']], // Ordenação por data de entrega descendente
      raw: true, // Retorna os resultados como objetos JavaScript simples
      nest: true, // Aninha os resultados dentro dos modelos relacionados
      include: [ // Inclui modelos relacionados para trazer atributos específicos
        {
          model: Service,
          attributes: ['description'] // Inclui apenas o atributo de descrição do serviço
        },
        {
          model: Client,
          attributes: ['name'] // Inclui apenas o atributo de nome do cliente
        }
      ]
    };

    // Configuração de paginação se o número da página for especificado e maior que zero
    if (page && page > 0) {
      offset = (page - 1) * limit; // Calcula o offset com base na página
      options.limit = limit; // Define o limite de registros
      options.offset = offset; // Define o offset
    }

    // Configuração de busca por texto se houver um texto de busca especificado
    if (searchText) {
      whereClause[Op.or] = [
        { theme: { [Op.like]: `%${searchText}%` } }, // Busca por tema similar ao texto
        { '$Client.name$': { [Op.like]: `%${searchText}%` } } // Busca por nome do cliente similar ao texto
      ];
    }

    // Configuração de filtro por status se um status de filtro for especificado e não for "TODOS"
    if (filterStatus && filterStatus !== OrderStatus.TODOS) {
      whereClause.status = filterStatus; // Filtra por status específico
    }

    try {
      // Executa as consultas de busca de ordens e contagem de registros
      const [data, count] = await Promise.all([
        Order.findAll(options), // Busca as ordens com as opções configuradas
        Order.count({
          where: whereClause,
          include: [Client] // Conta o número total de registros com as mesmas condições, incluindo o cliente
        })
      ]);
      return { data, count }; // Retorna os dados e a contagem de registros encontrados
    } catch (error) {
      console.error('Erro ao buscar ordens:', error); // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível buscar as ordens',
        code: 'ERRO_BUSCA_ORDENS',
        details: error as SQLiteError, // Detalhes específicos do erro, se disponíveis
      };
      throw new Error(JSON.stringify(appError)); // Lança o erro como uma exceção
    }
  }

  // Método estático para buscar uma ordem pelo ID
  static async findById(id: number): Promise<Order | null> {
    try {
      const data = await Order.findByPk(
        id,
        {
          include: [ // Inclui modelos relacionados para trazer atributos específicos
            {
              model: Client,
              attributes: ['id', 'name'] // Inclui apenas os atributos de ID e nome do cliente
            },
            {
              model: Task // Inclui o modelo de Task relacionado
            }
          ]
        }
      );

      if (data) {
        return data.toJSON() as Order; // Retorna os dados da ordem como um objeto JSON
      } else {
        // Se a ordem não for encontrada, lança um erro personalizado
        const notFoundError: IAppError = {
          message: 'Ordem não encontrada',
          code: 'ORDEM_NAO_ENCONTRADA',
        };
        throw new Error(JSON.stringify(notFoundError));
      }
    } catch (error) {
      console.error('Erro ao buscar ordem por ID:', error); // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível buscar a ordem',
        code: 'ERRO_BUSCA_ORDEM',
        details: error as SQLiteError, // Detalhes específicos do erro, se disponíveis
      };
      throw new Error(JSON.stringify(appError)); // Lança o erro como uma exceção
    }
  }

  // Método estático para buscar ordens de um cliente por ID do cliente, com paginação e filtros opcionais
  static async findOrdersByClientId(
    clientId: number,
    searchText: string,
    page: number,
    filterStatus: OrderStatus
  ): Promise<{ data: Order[]; count: number }> {
    const limit = 15; // Limite de registros por página
    const offset = (page - 1) * limit; // Offset calculado com base na página

    let whereClause: any = {
      idClient: clientId // Condição inicial para buscar por ID do cliente
    };

    // Configuração de busca por texto se houver um texto de busca especificado
    if (searchText) {
      whereClause[Op.or] = [
        { theme: { [Op.like]: `%${searchText}%` } }, // Busca por tema similar ao texto
        { '$Service.description$': { [Op.like]: `%${searchText}%` } } // Busca por descrição do serviço similar ao texto
      ];
    }

    // Configuração de filtro por status se um status de filtro for especificado e não for "TODOS"
    if (filterStatus && filterStatus !== OrderStatus.TODOS) {
      whereClause.status = filterStatus; // Filtra por status específico
    }

    try {
      // Executa as consultas de busca de ordens do cliente e contagem de registros
      const [data, count] = await Promise.all([
        Order.findAll({
          where: whereClause,
          limit: limit,
          offset: offset,
          include: [{
            model: Service,
            attributes: ['description'] // Inclui apenas o atributo de descrição do serviço
          }],
          raw: true, // Retorna os resultados como objetos JavaScript simples
          nest: true, // Aninha os resultados dentro dos modelos relacionados
        }),
        Order.count({
          where: whereClause,
          include: [{
            model: Service,
            attributes: ['description'] // Inclui apenas o atributo de descrição do serviço
          }],
        })
      ]);

      return { data, count }; // Retorna os dados e a contagem de registros encontrados
    } catch (error) {
      console.error('Erro ao buscar ordens por ID do cliente:', error); // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível buscar as ordens do cliente',
        code: 'ERRO_BUSCA_ORDENS_CLIENTE',
        details: error as SQLiteError, // Detalhes específicos do erro, se disponíveis
      };
      throw new Error(JSON.stringify(appError)); // Lança o erro como uma exceção
    }
  }

  // Método estático para salvar uma ordem (inserir ou atualizar)
  static async save(data: Order): Promise<Order | null> {
    const transaction = await sequelize.transaction(); // Inicia uma transação Sequelize
    try {
      let order: Order;

      // Verifica se a ordem já possui um ID
      if (data.id) {
        order = await OrderDAO.update(data.id, data, transaction); // Atualiza a ordem existente
      } else {
        order = await OrderDAO.create(data, transaction); // Cria uma nova ordem
      }

      await transaction.commit(); // Confirma a transação
      return order; // Retorna a ordem salva
    } catch (error) {
      await transaction.rollback(); // Reverte a transação em caso de erro
      console.error('Erro ao salvar ordem:', error); // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível salvar a ordem',
        code: 'ERRO_SALVAR_ORDEM',
        details: error as SQLiteError, // Detalhes específicos do erro, se disponíveis
      };
      throw new Error(JSON.stringify(appError)); // Lança o erro como uma exceção
    }
  }

  // Método estático para criar uma nova ordem
  static async create(data: Order, transaction: Transaction): Promise<Order> {
    try {
      const order = await Order.create(data, { transaction }); // Cria a ordem com os dados fornecidos

      // Se houver tarefas associadas à ordem, cria cada uma delas
      if (data.Tasks && data.Tasks.length > 0) {
        for (const task of data.Tasks) {
          await Task.create({ ...task, idOrder: order.id }, { transaction });
        }
      }

      return order; // Retorna a ordem criada
    } catch (error) {
      console.error('Erro ao criar ordem:', error); // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível criar a ordem',
        code: 'ERRO_CRIAR_ORDEM',
        details: error as SQLiteError, // Detalhes específicos do erro, se disponíveis
      };
      throw new Error(JSON.stringify(appError)); // Lança o erro como uma exceção
    }
  }

  // Método estático para atualizar uma ordem existente pelo ID
  static async update(id: number, data: Partial<Order>, transaction: Transaction): Promise<Order> {
    try {
      const [updateCount] = await Order.update(data, { where: { id }, transaction }); // Atualiza a ordem pelo ID

      // Verifica se a atualização foi bem-sucedida
      if (updateCount === 0) {
        // Se nenhum registro foi afetado pela atualização, lança um erro
        const notFoundError: IAppError = {
          message: `Ordem com id ${id} não encontrada`,
          code: 'ORDEM_NAO_ENCONTRADA',
        };
        throw new Error(JSON.stringify(notFoundError));
      }

      // Remove todas as tarefas associadas à ordem pelo ID
      await Task.destroy({ where: { idOrder: id }, transaction });

      // Se houver tarefas no objeto de dados, cria cada uma delas
      if (data.Tasks && data.Tasks.length > 0) {
        await Task.bulkCreate(data.Tasks, { transaction });
      }

      // Busca a ordem atualizada pelo ID, incluindo o cliente e as tarefas
      const updatedOrder = await Order.findByPk(id, { include: [Client, Task], transaction });

      // Verifica se a ordem atualizada foi encontrada
      if (!updatedOrder) {
        // Se a ordem não for encontrada após a atualização, lança um erro
        const notFoundError: IAppError = {
          message: `Ordem com id ${id} não encontrada após atualização`,
          code: 'ORDEM_NAO_ENCONTRADA',
        };
        throw new Error(JSON.stringify(notFoundError));
      }

      return updatedOrder.toJSON() as Order; // Retorna a ordem atualizada como um objeto JSON
    } catch (error) {
      console.error('Erro ao atualizar ordem:', error); // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível atualizar a ordem',
        code: 'ERRO_ATUALIZAR_ORDEM',
        details: error as SQLiteError, // Detalhes específicos do erro, se disponíveis
      };
      throw new Error(JSON.stringify(appError)); // Lança o erro como uma exceção
    }
  }

  // Método estático para excluir uma ordem pelo ID
  static async delete(id: number): Promise<number> {
    try {
      const deletedRows = await Order.destroy({ where: { id } }); // Exclui a ordem pelo ID

      // Verifica se alguma linha foi afetada pela exclusão
      if (deletedRows === 0) {
        // Se nenhuma ordem foi excluída, lança um erro
        const notFoundError: IAppError = {
          message: `Ordem com id ${id} não encontrada para exclusão`,
          code: 'ORDEM_NAO_ENCONTRADA',
        };
        throw new Error(JSON.stringify(notFoundError));
      }

      return deletedRows; // Retorna o número de linhas excluídas
    } catch (error) {
      console.error('Erro ao deletar ordem:', error); // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível deletar a ordem',
        code: 'ERRO_DELECAO_ORDEM',
        details: error as SQLiteError, // Detalhes específicos do erro, se disponíveis
      };
      throw new Error(JSON.stringify(appError)); // Lança o erro como uma exceção
    }
  }
}

export default OrderDAO; // Exporta a classe OrderDAO
