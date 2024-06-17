import { Sequelize } from 'sequelize'
import config from './config/database'

const env = process.env.NODE_ENV || 'development'
const dbConfig = config[env]

const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.storage,
  logging: console.log
})

export default sequelize
