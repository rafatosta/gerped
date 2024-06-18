import { OrderStatus } from "@backend/enums/OrderStatus";
import Order, { OrderAttributes } from "@backend/models/Order";

export const seedOrders = async () => {
    try {
        const data: OrderAttributes[] = [
            { idClient: 1, idService: 1, theme: 'Pedido de Marketing', orderDate: new Date(1672531200000), deliveryDate: new Date(1675132800000), price: 450.00, status: OrderStatus.ATIVO },
            { idClient: 2, idService: 2, theme: 'Consultoria em Marketing', orderDate: new Date(1672617600000), deliveryDate: new Date(1675219200000), price: 1200.50, status: OrderStatus.ATIVO },
            { idClient: 3, idService: 3, theme: 'Gestão de Projetos', orderDate: new Date(1672704000000), deliveryDate: new Date(1675305600000), price: 800.75, status: OrderStatus.ATIVO },
            { idClient: 4, idService: 2, theme: 'Consultoria em Gestão de Custos', orderDate: new Date(1675382400000), deliveryDate: new Date(1677984000000), price: 480.50, status: OrderStatus.ATIVO },
            { idClient: 1, idService: 4, theme: 'Consultoria em Recursos Humanos', orderDate: new Date(1673136000000), deliveryDate: new Date(1675737600000), price: 1100.30, status: OrderStatus.FINALIZADO },
            { idClient: 2, idService: 1, theme: 'Marketing Digital para E-commerce', orderDate: new Date(1673222400000), deliveryDate: new Date(1675824000000), price: 500.40, status: OrderStatus.ATIVO }
        ];

        await Order.bulkCreate(data);
    } catch (error) {
        console.error('Erro ao popular o banco de dados:', error);
    }
};
