import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '../db'

export interface ServiceAttributes {
  id?: number
  description: string
}

interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service
  extends Model<ServiceAttributes, ServiceCreationAttributes>
  implements ServiceAttributes
{
  public id!: number
  public description!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Service'
  }
)

export default Service
