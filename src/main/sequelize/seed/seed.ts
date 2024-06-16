import sequelize from '../db';
import { seedClients } from './seedClients';


export const Seed = async () => {
  try {
    await limparTabelas(); // Limpe todas as tabelas antes de adicionar os dados

    // Array de arquivos de seed
    const seedFiles = [
      seedClients,

    ];

    // Execute cada arquivo de seed
    for (const seedFile of seedFiles) {
      await seedFile();
    }
  } catch (error) {
    console.error('Erro ao popular o banco de dados via Seed:', error);
  }
};

const limparTabelas = async () => {
  try {
    await sequelize.sync({ force: true }); // Limpe todas as tabelas
    console.log('Todas as tabelas foram limpas com sucesso.');
  } catch (error) {
    console.error('Erro ao limpar todas as tabelas:', error);
  }
};


