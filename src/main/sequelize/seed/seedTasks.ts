import { TaskStatus } from "@backend/enums/TaskStatus";
import Task, { TaskAttributes } from "@backend/models/Task";

export const seedTasks = async () => {
    try {
        const data: TaskAttributes[] = [
            { status: TaskStatus.PENDENTE, description: 'Definir estratégias de marketing', idOrder: 1},
            { status: TaskStatus.PENDENTE, description: 'Realizar análise de mercado', idOrder: 1},
            { status: TaskStatus.PENDENTE, description: 'Desenvolver campanha publicitária', idOrder: 2},
            { status: TaskStatus.PENDENTE, description: 'Avaliar resultados de campanhas', idOrder: 2},
            { status: TaskStatus.PENDENTE, description: 'Planejar atividades do projeto', idOrder: 3},
            { status: TaskStatus.FINALIZADO, description: 'Coletar requisitos', idOrder: 3, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Implementar solução de custos', idOrder: 4},
            { status: TaskStatus.FINALIZADO, description: 'Auditar processos', idOrder: 4, conclusionDate: new Date() }
        ];

        await Task.bulkCreate(data);
    } catch (error) {
        console.error('Erro ao popular o banco de dados:', error);
    }
};
