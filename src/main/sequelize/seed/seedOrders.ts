import { OrderStatus } from '@backend/enums/OrderStatus'
import Order, { OrderAttributes } from '@backend/models/Order'

export const seedOrders = async () => {
  try {
    const data: OrderAttributes[] = [
      {
        idClient: 1,
        idService: 1,
        theme: 'Pedido de Marketing',
        orderDate: new Date(2024, 5, 3),
        deliveryDate: new Date(2024, 5, 10),
        price: 450.0,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 2,
        idService: 2,
        theme: 'Consultoria em Marketing',
        orderDate: new Date(2024, 5, 5),
        deliveryDate: new Date(2024, 5, 12),
        price: 1200.5,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 3,
        idService: 3,
        theme: 'Gestão de Projetos',
        orderDate: new Date(2024, 5, 7),
        deliveryDate: new Date(2024, 5, 14),
        price: 800.75,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 4,
        idService: 2,
        theme: 'Consultoria em Gestão de Custos',
        orderDate: new Date(2024, 5, 10),
        deliveryDate: new Date(2024, 5, 17),
        price: 480.5,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 1,
        idService: 4,
        theme: 'Consultoria em Recursos Humanos',
        orderDate: new Date(2024, 5, 12),
        deliveryDate: new Date(2024, 5, 19),
        price: 1100.3,
        status: OrderStatus.FINALIZADO
      },
      {
        idClient: 2,
        idService: 1,
        theme: 'Marketing Digital para E-commerce',
        orderDate: new Date(2024, 5, 14),
        deliveryDate: new Date(2024, 5, 21),
        price: 500.4,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 5,
        idService: 3,
        theme: 'Treinamento e Desenvolvimento',
        orderDate: new Date(2024, 5, 17),
        deliveryDate: new Date(2024, 5, 24),
        price: 900.0,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 6,
        idService: 2,
        theme: 'Auditoria Financeira',
        orderDate: new Date(2024, 5, 19),
        deliveryDate: new Date(2024, 5, 26),
        price: 1500.75,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 7,
        idService: 1,
        theme: 'Planejamento Estratégico',
        orderDate: new Date(2024, 5, 21),
        deliveryDate: new Date(2024, 5, 28),
        price: 1300.6,
        status: OrderStatus.FINALIZADO
      },
      {
        idClient: 8,
        idService: 4,
        theme: 'Consultoria Jurídica',
        orderDate: new Date(2024, 5, 24),
        deliveryDate: new Date(2024, 6, 1),
        price: 780.9,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 9,
        idService: 2,
        theme: 'Consultoria de Vendas',
        orderDate: new Date(2024, 5, 26),
        deliveryDate: new Date(2024, 6, 3),
        price: 650.25,
        status: OrderStatus.FINALIZADO
      },
      {
        idClient: 10,
        idService: 3,
        theme: 'Análise de Mercado',
        orderDate: new Date(2024, 5, 28),
        deliveryDate: new Date(2024, 6, 5),
        price: 1150.45,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 1,
        idService: 4,
        theme: 'Desenvolvimento de Produto',
        orderDate: new Date(2024, 6, 1),
        deliveryDate: new Date(2024, 6, 8),
        price: 950.0,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 2,
        idService: 2,
        theme: 'Estudo de Viabilidade',
        orderDate: new Date(2024, 6, 3),
        deliveryDate: new Date(2024, 6, 10),
        price: 1300.5,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 11,
        idService: 1,
        theme: 'Consultoria de Negócios',
        orderDate: new Date(2024, 6, 5),
        deliveryDate: new Date(2024, 6, 12),
        price: 1450.3,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 12,
        idService: 3,
        theme: 'Análise Financeira',
        orderDate: new Date(2024, 6, 8),
        deliveryDate: new Date(2024, 6, 15),
        price: 700.2,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 13,
        idService: 4,
        theme: 'Plano de Marketing',
        orderDate: new Date(2024, 6, 10),
        deliveryDate: new Date(2024, 6, 17),
        price: 1200.0,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 14,
        idService: 2,
        theme: 'Análise SWOT',
        orderDate: new Date(2024, 6, 12),
        deliveryDate: new Date(2024, 6, 19),
        price: 650.7,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 15,
        idService: 1,
        theme: 'Pesquisa de Mercado',
        orderDate: new Date(2024, 6, 15),
        deliveryDate: new Date(2024, 6, 22),
        price: 990.9,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 16,
        idService: 3,
        theme: 'Treinamento de Vendas',
        orderDate: new Date(2024, 6, 17),
        deliveryDate: new Date(2024, 6, 24),
        price: 850.45,
        status: OrderStatus.FINALIZADO
      },
      {
        idClient: 17,
        idService: 4,
        theme: 'Desenvolvimento de Liderança',
        orderDate: new Date(2024, 6, 19),
        deliveryDate: new Date(2024, 6, 26),
        price: 760.8,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 18,
        idService: 2,
        theme: 'Consultoria de Processos',
        orderDate: new Date(2024, 6, 22),
        deliveryDate: new Date(2024, 6, 29),
        price: 1400.65,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 19,
        idService: 1,
        theme: 'Consultoria Organizacional',
        orderDate: new Date(2024, 6, 24),
        deliveryDate: new Date(2024, 6, 31),
        price: 1120.75,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 20,
        idService: 3,
        theme: 'Consultoria de Inovação',
        orderDate: new Date(2024, 6, 26),
        deliveryDate: new Date(2024, 7, 3),
        price: 1250.55,
        status: OrderStatus.FINALIZADO
      },
      {
        idClient: 6,
        idService: 4,
        theme: 'Gestão de Riscos',
        orderDate: new Date(2024, 6, 29),
        deliveryDate: new Date(2024, 7, 6),
        price: 980.2,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 7,
        idService: 2,
        theme: 'Planejamento Financeiro',
        orderDate: new Date(2024, 6, 31),
        deliveryDate: new Date(2024, 7, 7),
        price: 1300.1,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 8,
        idService: 1,
        theme: 'Consultoria em Estratégia',
        orderDate: new Date(2024, 7, 2),
        deliveryDate: new Date(2024, 7, 9),
        price: 1100.4,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 9,
        idService: 3,
        theme: 'Gestão de Mudanças',
        orderDate: new Date(2024, 7, 5),
        deliveryDate: new Date(2024, 7, 12),
        price: 990.0,
        status: OrderStatus.FINALIZADO
      },
      {
        idClient: 10,
        idService: 2,
        theme: 'Consultoria de TI',
        orderDate: new Date(2024, 7, 7),
        deliveryDate: new Date(2024, 7, 14),
        price: 1050.9,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 5,
        idService: 4,
        theme: 'Análise de Competitividade',
        orderDate: new Date(2024, 7, 9),
        deliveryDate: new Date(2024, 7, 16),
        price: 670.8,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 11,
        idService: 1,
        theme: 'Auditoria Interna',
        orderDate: new Date(2024, 7, 12),
        deliveryDate: new Date(2024, 7, 19),
        price: 1250.0,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 12,
        idService: 2,
        theme: 'Reengenharia de Processos',
        orderDate: new Date(2024, 7, 14),
        deliveryDate: new Date(2024, 7, 21),
        price: 1400.6,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 13,
        idService: 4,
        theme: 'Plano de Negócios',
        orderDate: new Date(2024, 7, 16),
        deliveryDate: new Date(2024, 7, 23),
        price: 1150.0,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 14,
        idService: 1,
        theme: 'Análise de Desempenho',
        orderDate: new Date(2024, 7, 19),
        deliveryDate: new Date(2024, 7, 26),
        price: 950.6,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 15,
        idService: 3,
        theme: 'Consultoria Contábil',
        orderDate: new Date(2024, 7, 21),
        deliveryDate: new Date(2024, 7, 28),
        price: 1050.9,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 16,
        idService: 2,
        theme: 'Treinamento Corporativo',
        orderDate: new Date(2024, 7, 23),
        deliveryDate: new Date(2024, 7, 30),
        price: 1300.2,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 17,
        idService: 1,
        theme: 'Análise de Investimentos',
        orderDate: new Date(2024, 7, 26),
        deliveryDate: new Date(2024, 8, 2),
        price: 900.75,
        status: OrderStatus.FINALIZADO
      },
      {
        idClient: 18,
        idService: 3,
        theme: 'Planejamento Orçamentário',
        orderDate: new Date(2024, 7, 28),
        deliveryDate: new Date(2024, 8, 4),
        price: 1150.3,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 19,
        idService: 2,
        theme: 'Desenvolvimento de Aplicativos',
        orderDate: new Date(2024, 7, 30),
        deliveryDate: new Date(2024, 8, 6),
        price: 1500.6,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 20,
        idService: 1,
        theme: 'Consultoria em TI',
        orderDate: new Date(2024, 8, 2),
        deliveryDate: new Date(2024, 8, 9),
        price: 1050.4,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 1,
        idService: 3,
        theme: 'Gestão de Equipes',
        orderDate: new Date(2024, 8, 4),
        deliveryDate: new Date(2024, 8, 11),
        price: 1250.9,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 2,
        idService: 4,
        theme: 'Planejamento de Marketing',
        orderDate: new Date(2024, 8, 6),
        deliveryDate: new Date(2024, 8, 13),
        price: 1400.0,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 3,
        idService: 1,
        theme: 'Consultoria de Operações',
        orderDate: new Date(2024, 8, 9),
        deliveryDate: new Date(2024, 8, 16),
        price: 950.6,
        status: OrderStatus.FINALIZADO
      },
      {
        idClient: 4,
        idService: 3,
        theme: 'Desenvolvimento de Sistemas',
        orderDate: new Date(2024, 8, 11),
        deliveryDate: new Date(2024, 8, 18),
        price: 1150.9,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 5,
        idService: 2,
        theme: 'Auditoria Externa',
        orderDate: new Date(2024, 8, 13),
        deliveryDate: new Date(2024, 8, 20),
        price: 1300.2,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 6,
        idService: 4,
        theme: 'Desenvolvimento de Software',
        orderDate: new Date(2024, 8, 16),
        deliveryDate: new Date(2024, 8, 23),
        price: 900.5,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 7,
        idService: 1,
        theme: 'Consultoria Estratégica',
        orderDate: new Date(2024, 8, 18),
        deliveryDate: new Date(2024, 8, 25),
        price: 1100.75,
        status: OrderStatus.FINALIZADO
      },
      {
        idClient: 8,
        idService: 3,
        theme: 'Gestão da Qualidade',
        orderDate: new Date(2024, 8, 20),
        deliveryDate: new Date(2024, 8, 27),
        price: 950.3,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 9,
        idService: 2,
        theme: 'Consultoria Ambiental',
        orderDate: new Date(2024, 8, 23),
        deliveryDate: new Date(2024, 8, 30),
        price: 1200.6,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 10,
        idService: 1,
        theme: 'Consultoria Empresarial',
        orderDate: new Date(2024, 8, 25),
        deliveryDate: new Date(2024, 9, 1),
        price: 1050.4,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 11,
        idService: 3,
        theme: 'Planejamento Tributário',
        orderDate: new Date(2024, 8, 27),
        deliveryDate: new Date(2024, 9, 3),
        price: 1250.6,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 12,
        idService: 4,
        theme: 'Desenvolvimento Web',
        orderDate: new Date(2024, 9, 1),
        deliveryDate: new Date(2024, 9, 8),
        price: 950.75,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 13,
        idService: 1,
        theme: 'Consultoria de Marketing',
        orderDate: new Date(2024, 9, 3),
        deliveryDate: new Date(2024, 9, 10),
        price: 1150.5,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 14,
        idService: 3,
        theme: 'Planejamento Estratégico',
        orderDate: new Date(2024, 9, 5),
        deliveryDate: new Date(2024, 9, 12),
        price: 1400.8,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 15,
        idService: 2,
        theme: 'Análise Financeira',
        orderDate: new Date(2024, 9, 8),
        deliveryDate: new Date(2024, 9, 15),
        price: 1100.4,
        status: OrderStatus.FINALIZADO
      },
      {
        idClient: 16,
        idService: 4,
        theme: 'Desenvolvimento de Projetos',
        orderDate: new Date(2024, 9, 10),
        deliveryDate: new Date(2024, 9, 17),
        price: 1250.9,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 17,
        idService: 1,
        theme: 'Consultoria de TI',
        orderDate: new Date(2024, 9, 12),
        deliveryDate: new Date(2024, 9, 19),
        price: 1350.5,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 18,
        idService: 3,
        theme: 'Gestão de Projetos',
        orderDate: new Date(2024, 9, 15),
        deliveryDate: new Date(2024, 9, 22),
        price: 1200.6,
        status: OrderStatus.FINALIZADO
      },
      {
        idClient: 19,
        idService: 2,
        theme: 'Auditoria Interna',
        orderDate: new Date(2024, 9, 17),
        deliveryDate: new Date(2024, 9, 24),
        price: 1400.8,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 20,
        idService: 4,
        theme: 'Desenvolvimento de Negócios',
        orderDate: new Date(2024, 9, 19),
        deliveryDate: new Date(2024, 9, 26),
        price: 1050.9,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 1,
        idService: 1,
        theme: 'Consultoria de Vendas',
        orderDate: new Date(2024, 9, 22),
        deliveryDate: new Date(2024, 9, 29),
        price: 1250.5,
        status: OrderStatus.ATIVO
      },
      {
        idClient: 2,
        idService: 3,
        theme: 'Planejamento Orçamentário',
        orderDate: new Date(2024, 9, 24),
        deliveryDate: new Date(2024, 10, 1),
        price: 1150.6,
        status: OrderStatus.ATIVO
      }
    ]

    await Order.bulkCreate(data)
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error)
  }
}
