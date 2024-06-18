import Service, { ServiceAttributes } from "@backend/models/Service";


export const seedServices = async () => {
  try {
    const data: ServiceAttributes[] = [
      { description: 'Pesquisa' },
      { description: 'Desenvolvimento' },
      { description: 'Consultoria' },
      { description: 'Orientação' },
      { description: 'Revisão' },
      { description: 'Tradução' },
    ];

    await Service.bulkCreate(data);
  } catch (error) {
    console.error('Erro ao popular o banco de dados:', error);
  }
};