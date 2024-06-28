import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';
import { OrderStatus } from '@backend/enums/OrderStatus';
import Client from './Client';
import Service from './Service';
import Task from './Task';

export interface OrderAttributes {
    id?: number;
    idClient?: number;
    idService: number;
    theme: string;
    orderDate: Date;
    deliveryDate: Date;
    price: number;
    status: OrderStatus;
    Client?: Client;
    Service?: Service;
    Tasks?: Task[]
    countTask?: number;
    countTaskFinished?: number
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> { }

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: number;
    public idClient!: number;
    public idService!: number;
    public theme!: string;
    public orderDate!: Date;
    public deliveryDate!: Date;
    public price!: number;
    public status!: OrderStatus;
    public Client!: Client;
    public Service!: Service;
    public Tasks!: Task[]
    public countTask!: number;
    public countTaskFinished!: number


    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
        // Regras de associação com restrição para Client e Service
        Order.belongsTo(Client, { foreignKey: 'idClient', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
        Order.belongsTo(Service, { foreignKey: 'idService', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

        // Regra de cascata para remover Tasks ao remover Order
        Order.hasMany(Task, { foreignKey: 'idOrder', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

        Client.hasMany(Order, { foreignKey: 'idClient', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
        Service.hasMany(Order, { foreignKey: 'idService', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });

        Task.belongsTo(Order, { foreignKey: 'idOrder', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

    }
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        idService: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Service,
                key: 'id',
            }
        },
        theme: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        deliveryDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: OrderStatus.ATIVO,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'Orders',
    }
);

Order.associate();

export default Order;
