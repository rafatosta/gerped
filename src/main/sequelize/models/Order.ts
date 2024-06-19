import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../db';
import { OrderStatus } from '@backend/enums/OrderStatus';
import Client from './Client';
import Service from './Service';

export interface OrderAttributes {
    id?: number;
    idClient: number;
    idService: number;
    theme: string;
    orderDate: Date;
    deliveryDate: Date;
    price: number;
    status: OrderStatus;
    Client?: Client;
    Service?: Service;
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


    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static associate() {
        // Define association here
        Order.belongsTo(Client, { foreignKey: 'idClient' });
        Order.belongsTo(Service, { foreignKey: 'idService' });
    }
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idClient: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Client,
                key: 'id',
            }
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


// Call associate method
Order.associate();

export default Order;
