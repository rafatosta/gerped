import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';

interface ClientAttributes {
  id: number;
  name: string;
  phone?: string;
  course?: string;
  institute?: string
}

interface ClientCreationAttributes extends Optional<ClientAttributes, 'id'> { }

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
  public id!: number;
  public name!: string;
  public phone?: string;
  public course?: string;
  public institute?: string

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Client.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone: {
    type: DataTypes.TEXT,
  },
  course: {
    type: DataTypes.TEXT,
  },
  institute: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize,
  modelName: 'Client',
});


export default Client;
