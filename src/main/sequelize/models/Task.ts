import { TaskStatus } from '@backend/enums/TaskStatus'
import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '@backend/db'
import Order from './Order'

export interface TaskAttributes {
  id?: number
  idOrder?: number
  status: TaskStatus
  description: string
  conclusionDate?: Date
  Order?: Order
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number
  public idOrder!: number
  public status!: TaskStatus
  public description!: string
  public conclusionDate!: Date
  public Order!: Order

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: TaskStatus.PENDENTE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    conclusionDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'Tasks'
  }
)

export default Task
