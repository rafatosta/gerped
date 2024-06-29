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
            { idClient: 2, idService: 1, theme: 'Marketing Digital para E-commerce', orderDate: new Date(1673222400000), deliveryDate: new Date(1675824000000), price: 500.40, status: OrderStatus.ATIVO },
            { idClient: 5, idService: 3, theme: 'Treinamento e Desenvolvimento', orderDate: new Date(1673308800000), deliveryDate: new Date(1675910400000), price: 900.00, status: OrderStatus.ATIVO },
            { idClient: 6, idService: 2, theme: 'Auditoria Financeira', orderDate: new Date(1673395200000), deliveryDate: new Date(1676006800000), price: 1500.75, status: OrderStatus.ATIVO },
            { idClient: 7, idService: 1, theme: 'Planejamento Estratégico', orderDate: new Date(1673481600000), deliveryDate: new Date(1676093200000), price: 1300.60, status: OrderStatus.FINALIZADO },
            { idClient: 8, idService: 4, theme: 'Consultoria Jurídica', orderDate: new Date(1673568000000), deliveryDate: new Date(1676179600000), price: 780.90, status: OrderStatus.ATIVO },
            { idClient: 9, idService: 2, theme: 'Consultoria de Vendas', orderDate: new Date(1673654400000), deliveryDate: new Date(1676266000000), price: 650.25, status: OrderStatus.FINALIZADO },
            { idClient: 10, idService: 3, theme: 'Análise de Mercado', orderDate: new Date(1673740800000), deliveryDate: new Date(1676352400000), price: 1150.45, status: OrderStatus.ATIVO },
            { idClient: 1, idService: 4, theme: 'Desenvolvimento de Produto', orderDate: new Date(1673832000000), deliveryDate: new Date(1676454000000), price: 950.00, status: OrderStatus.ATIVO },
            { idClient: 2, idService: 2, theme: 'Estudo de Viabilidade', orderDate: new Date(1673918400000), deliveryDate: new Date(1676540400000), price: 1300.50, status: OrderStatus.ATIVO },
            { idClient: 11, idService: 1, theme: 'Consultoria de Negócios', orderDate: new Date(1674004800000), deliveryDate: new Date(1676626800000), price: 1450.30, status: OrderStatus.ATIVO },
            { idClient: 12, idService: 3, theme: 'Análise Financeira', orderDate: new Date(1674091200000), deliveryDate: new Date(1676713200000), price: 700.20, status: OrderStatus.ATIVO },
            { idClient: 13, idService: 4, theme: 'Plano de Marketing', orderDate: new Date(1674177600000), deliveryDate: new Date(1676799600000), price: 1200.00, status: OrderStatus.ATIVO },
            { idClient: 14, idService: 2, theme: 'Análise SWOT', orderDate: new Date(1674264000000), deliveryDate: new Date(1676886000000), price: 650.70, status: OrderStatus.ATIVO },
            { idClient: 15, idService: 1, theme: 'Pesquisa de Mercado', orderDate: new Date(1674350400000), deliveryDate: new Date(1676972400000), price: 990.90, status: OrderStatus.ATIVO },
            { idClient: 16, idService: 3, theme: 'Treinamento de Vendas', orderDate: new Date(1674436800000), deliveryDate: new Date(1677058800000), price: 850.45, status: OrderStatus.FINALIZADO },
            { idClient: 17, idService: 4, theme: 'Desenvolvimento de Liderança', orderDate: new Date(1674523200000), deliveryDate: new Date(1677145200000), price: 760.80, status: OrderStatus.ATIVO },
            { idClient: 18, idService: 2, theme: 'Consultoria de Processos', orderDate: new Date(1674609600000), deliveryDate: new Date(1677231600000), price: 1400.65, status: OrderStatus.ATIVO },
            { idClient: 19, idService: 1, theme: 'Consultoria Organizacional', orderDate: new Date(1674696000000), deliveryDate: new Date(1677318000000), price: 1120.75, status: OrderStatus.ATIVO },
            { idClient: 20, idService: 3, theme: 'Consultoria de Inovação', orderDate: new Date(1674782400000), deliveryDate: new Date(1677404400000), price: 1250.55, status: OrderStatus.FINALIZADO },
            { idClient: 6, idService: 4, theme: 'Gestão de Riscos', orderDate: new Date(1674868800000), deliveryDate: new Date(1677490800000), price: 980.20, status: OrderStatus.ATIVO },
            { idClient: 7, idService: 2, theme: 'Planejamento Financeiro', orderDate: new Date(1674955200000), deliveryDate: new Date(1677577200000), price: 1300.10, status: OrderStatus.ATIVO },
            { idClient: 8, idService: 1, theme: 'Consultoria em Estratégia', orderDate: new Date(1675041600000), deliveryDate: new Date(1677663600000), price: 1100.40, status: OrderStatus.ATIVO },
            { idClient: 9, idService: 3, theme: 'Gestão de Mudanças', orderDate: new Date(1675128000000), deliveryDate: new Date(1677750000000), price: 990.00, status: OrderStatus.FINALIZADO },
            { idClient: 10, idService: 2, theme: 'Consultoria de TI', orderDate: new Date(1675214400000), deliveryDate: new Date(1677836400000), price: 1050.90, status: OrderStatus.ATIVO },
            { idClient: 5, idService: 4, theme: 'Análise de Competitividade', orderDate: new Date(1675300800000), deliveryDate: new Date(1677922800000), price: 670.80, status: OrderStatus.ATIVO },
            { idClient: 11, idService: 1, theme: 'Auditoria Interna', orderDate: new Date(1675387200000), deliveryDate: new Date(1678009200000), price: 1250.00, status: OrderStatus.ATIVO },
            { idClient: 12, idService: 2, theme: 'Reengenharia de Processos', orderDate: new Date(1675473600000), deliveryDate: new Date(1678095600000), price: 1400.60, status: OrderStatus.ATIVO }
        ];

        await Order.bulkCreate(data);
    } catch (error) {
        console.error('Erro ao popular o banco de dados:', error);
    }
};
