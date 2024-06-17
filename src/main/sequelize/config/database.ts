//Configurações de conexão com o banco de dados.

export default {
  development: {
    username: 'root',
    password: null,
    database: 'database_development',
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: './gerped-dev.sqlite'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: './gerped.sqlite'
  }
}
