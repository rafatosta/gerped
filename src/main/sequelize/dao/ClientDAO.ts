import { Op } from 'sequelize'
import Client, { ClientAttributes } from '../models/Client' // Importa o modelo de Cliente e seus atributos
import { IAppError, SQLiteError } from '@backend/interface/IAppError' // Importa interfaces de erro

// Classe DAO para operações relacionadas ao Cliente
class ClientDAO {
  // Método estático para buscar todos os clientes com paginação e filtro opcional
  static async findAll(
    searchText?: string,
    page?: number
  ): Promise<{ data: Client[]; count: number }> {
    const limit = 15 // Limite de registros por página
    let offset = 0 // Offset inicial
    const options: any = {
      where: {}, // Condições de busca inicialmente vazias
      order: [['createdAt', 'DESC']], // Ordenação por data de criação descendente
      raw: true // Retorna os resultados como objetos JavaScript simples
    }

    // Configuração de paginação se o número da página for especificado e maior que zero
    if (page && page > 0) {
      offset = (page - 1) * limit // Calcula o offset com base na página
      options.limit = limit // Define o limite de registros
      options.offset = offset // Define o offset
    }

    // Configuração de busca por texto se houver um texto de busca especificado
    if (searchText) {
      options.where = {
        [Op.or]: [
          { name: { [Op.like]: `%${searchText}%` } }, // Busca por nome similar ao texto
          { phone: { [Op.like]: `%${searchText}%` } }, // Busca por telefone similar ao texto
          { course: { [Op.like]: `%${searchText}%` } } // Busca por curso similar ao texto
        ]
      }
    }

    try {
      // Executa as consultas de busca de clientes e contagem de registros
      const [data, count] = await Promise.all([
        Client.findAll(options), // Busca os clientes com as opções configuradas
        Client.count({ where: options.where }) // Conta o número total de registros com as mesmas condições
      ])
      return { data, count } // Retorna os dados e a contagem de registros encontrados
    } catch (error) {
      console.error('Erro ao buscar clientes:', error) // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível buscar os clientes',
        code: 'ERRO_BUSCA_CLIENTES',
        details: error as SQLiteError // Detalhes específicos do erro, se disponíveis
      }
      throw new Error(JSON.stringify(appError)) // Lança o erro como uma exceção
    }
  }

  // Método estático para buscar um cliente pelo ID
  static async findById(id: number): Promise<Client | null> {
    try {
      const client = await Client.findByPk(id, { raw: true }) // Busca o cliente pelo ID
      if (!client) {
        // Se o cliente não for encontrado, lança um erro personalizado
        const notFoundError: IAppError = {
          message: 'Cliente não encontrado',
          code: 'CLIENTE_NAO_ENCONTRADO'
        }
        throw new Error(JSON.stringify(notFoundError))
      }
      return client // Retorna o cliente encontrado
    } catch (error) {
      console.error('Erro ao buscar cliente por ID:', error) // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível buscar o cliente',
        code: 'ERRO_BUSCA_CLIENTE',
        details: error as SQLiteError // Detalhes específicos do erro, se disponíveis
      }
      throw new Error(JSON.stringify(appError)) // Lança o erro como uma exceção
    }
  }

  // Método estático para salvar um cliente (inserir ou atualizar)
  static async save(data: Client): Promise<Client | ClientAttributes | null> {
    try {
      if (data.id) {
        // Se o cliente já tiver um ID, atualiza o cliente existente
        await ClientDAO.update(data.id, data)
        return await ClientDAO.findById(data.id) // Retorna o cliente atualizado
      }
      return await ClientDAO.create(data) // Se não tiver ID, cria um novo cliente
    } catch (error) {
      console.error('Erro ao salvar cliente:', error) // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível salvar o cliente',
        code: 'ERRO_SALVAR_CLIENTE',
        details: error as SQLiteError // Detalhes específicos do erro, se disponíveis
      }
      throw new Error(JSON.stringify(appError)) // Lança o erro como uma exceção
    }
  }

  // Método estático para criar um novo cliente
  static async create(data: Client): Promise<Client> {
    try {
      return await Client.create(data, { raw: true }) // Cria o cliente com os dados fornecidos
    } catch (error) {
      console.error('Erro ao criar cliente:', error) // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível criar o cliente',
        code: 'ERRO_CRIAR_CLIENTE',
        details: error as SQLiteError // Detalhes específicos do erro, se disponíveis
      }
      throw new Error(JSON.stringify(appError)) // Lança o erro como uma exceção
    }
  }

  // Método estático para atualizar um cliente existente pelo ID
  static async update(id: number, data: Partial<Client>): Promise<number> {
    try {
      const [affectedRows] = await Client.update(data, { where: { id } }) // Atualiza o cliente pelo ID
      if (affectedRows === 0) {
        // Se nenhum registro foi afetado pela atualização, lança um erro
        const notFoundError: IAppError = {
          message: 'Cliente não encontrado para atualização',
          code: 'CLIENTE_NAO_ENCONTRADO'
        }
        throw new Error(JSON.stringify(notFoundError))
      }
      return affectedRows // Retorna o número de linhas afetadas pela atualização
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error) // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível atualizar o cliente',
        code: 'ERRO_ATUALIZAR_CLIENTE',
        details: error as SQLiteError // Detalhes específicos do erro, se disponíveis
      }
      throw new Error(JSON.stringify(appError)) // Lança o erro como uma exceção
    }
  }

  // Método estático para excluir um cliente pelo ID
  static async delete(id: number): Promise<number> {
    try {
      const deletedRows = await Client.destroy({ where: { id } }) // Exclui o cliente pelo ID
      if (deletedRows === 0) {
        // Se nenhum registro foi excluído, lança um erro
        const notFoundError: IAppError = {
          message: 'Cliente não encontrado para exclusão',
          code: 'CLIENTE_NAO_ENCONTRADO'
        }
        throw new Error(JSON.stringify(notFoundError))
      }
      return deletedRows // Retorna o número de linhas excluídas
    } catch (error) {
      console.error('Erro ao deletar cliente:', error) // Registra o erro no console
      // Cria um objeto de erro padronizado para ser lançado
      const appError: IAppError = {
        message: 'Não foi possível deletar o cliente',
        code: 'ERRO_DELECAO_CLIENTE',
        details: error as SQLiteError // Detalhes específicos do erro, se disponíveis
      }
      throw new Error(JSON.stringify(appError)) // Lança o erro como uma exceção
    }
  }
}

export default ClientDAO // Exporta a classe ClientDAO
