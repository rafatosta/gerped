import { TaskStatus } from "@backend/enums/TaskStatus";
import Task, { TaskAttributes } from "@backend/models/Task";

export const seedTasks = async () => {
    try {
        const data: TaskAttributes[] = [
            // Order 1
            { status: TaskStatus.PENDENTE, description: 'Conceitos básicos do marketing', idOrder: 1 },
            { status: TaskStatus.PENDENTE, description: 'Conceitos do marketing digital', idOrder: 1 },
            { status: TaskStatus.PENDENTE, description: 'Definir estratégias de marketing', idOrder: 1 },
            { status: TaskStatus.FINALIZADO, description: 'Realizar análise de mercado', idOrder: 1, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Preparar relatório final', idOrder: 1 },

            // Order 2
            { status: TaskStatus.PENDENTE, description: 'Desenvolver campanha publicitária', idOrder: 2 },
            { status: TaskStatus.FINALIZADO, description: 'Avaliar resultados de campanhas', idOrder: 2, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Criar plano de mídia', idOrder: 2 },
            { status: TaskStatus.PENDENTE, description: 'Realizar pesquisa de mercado', idOrder: 2 },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver conteúdo de marketing', idOrder: 2 },

            // Order 3
            { status: TaskStatus.PENDENTE, description: 'Planejar atividades do projeto', idOrder: 3 },
            { status: TaskStatus.FINALIZADO, description: 'Coletar requisitos', idOrder: 3, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver cronograma do projeto', idOrder: 3 },
            { status: TaskStatus.PENDENTE, description: 'Realizar análise de stakeholders', idOrder: 3 },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano de comunicação', idOrder: 3 },

            // Order 4
            { status: TaskStatus.PENDENTE, description: 'Implementar solução de custos', idOrder: 4 },
            { status: TaskStatus.FINALIZADO, description: 'Auditar processos', idOrder: 4, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano de corte de custos', idOrder: 4 },
            { status: TaskStatus.FINALIZADO, description: 'Analisar despesas operacionais', idOrder: 4, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Avaliar estratégias de redução de custos', idOrder: 4 },

            // Order 5
            { status: TaskStatus.PENDENTE, description: 'Revisar políticas de RH', idOrder: 5 },
            { status: TaskStatus.FINALIZADO, description: 'Realizar análise de necessidades de treinamento', idOrder: 5, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver programa de treinamento', idOrder: 5 },
            { status: TaskStatus.PENDENTE, description: 'Implementar estratégias de recrutamento', idOrder: 5 },
            { status: TaskStatus.PENDENTE, description: 'Avaliar desempenho de funcionários', idOrder: 5 },

            // Order 6
            { status: TaskStatus.PENDENTE, description: 'Analisar mercado de e-commerce', idOrder: 6 },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver estratégias de SEO', idOrder: 6 },
            { status: TaskStatus.FINALIZADO, description: 'Criar conteúdo digital', idOrder: 6, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Planejar campanhas de redes sociais', idOrder: 6 },
            { status: TaskStatus.PENDENTE, description: 'Avaliar resultados de marketing digital', idOrder: 6 },

            // Order 7
            { status: TaskStatus.PENDENTE, description: 'Planejar programa de treinamento', idOrder: 7 },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver material didático', idOrder: 7 },
            { status: TaskStatus.PENDENTE, description: 'Realizar treinamentos presenciais', idOrder: 7 },
            { status: TaskStatus.FINALIZADO, description: 'Avaliar eficácia dos treinamentos', idOrder: 7, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano de treinamento online', idOrder: 7 },

            // Order 8
            { status: TaskStatus.PENDENTE, description: 'Planejar auditoria financeira', idOrder: 8 },
            { status: TaskStatus.PENDENTE, description: 'Coletar dados financeiros', idOrder: 8 },
            { status: TaskStatus.PENDENTE, description: 'Analisar relatórios financeiros', idOrder: 8 },
            { status: TaskStatus.FINALIZADO, description: 'Desenvolver recomendações financeiras', idOrder: 8, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Preparar relatório de auditoria', idOrder: 8 },

            // Order 9
            { status: TaskStatus.PENDENTE, description: 'Planejar estratégia de vendas', idOrder: 9 },
            { status: TaskStatus.PENDENTE, description: 'Realizar pesquisa de mercado', idOrder: 9 },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver técnicas de vendas', idOrder: 9 },
            { status: TaskStatus.PENDENTE, description: 'Treinar equipe de vendas', idOrder: 9 },
            { status: TaskStatus.FINALIZADO, description: 'Avaliar desempenho de vendas', idOrder: 9, conclusionDate: new Date() },

            // Order 10
            { status: TaskStatus.PENDENTE, description: 'Coletar dados de mercado', idOrder: 10 },
            { status: TaskStatus.PENDENTE, description: 'Analisar dados de mercado', idOrder: 10 },
            { status: TaskStatus.FINALIZADO, description: 'Desenvolver estratégias de mercado', idOrder: 10, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Implementar plano de mercado', idOrder: 10 },
            { status: TaskStatus.PENDENTE, description: 'Avaliar eficácia do plano de mercado', idOrder: 10 },

            // Order 11
            { status: TaskStatus.PENDENTE, description: 'Desenvolver produto', idOrder: 11 },
            { status: TaskStatus.FINALIZADO, description: 'Testar produto', idOrder: 11, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Analisar feedback de clientes', idOrder: 11 },
            { status: TaskStatus.PENDENTE, description: 'Ajustar produto', idOrder: 11 },
            { status: TaskStatus.PENDENTE, description: 'Lançar produto no mercado', idOrder: 11 },

            // Order 12
            { status: TaskStatus.PENDENTE, description: 'Planejar estudo de viabilidade', idOrder: 12 },
            { status: TaskStatus.PENDENTE, description: 'Coletar dados relevantes', idOrder: 12 },
            { status: TaskStatus.PENDENTE, description: 'Analisar viabilidade do projeto', idOrder: 12 },
            { status: TaskStatus.FINALIZADO, description: 'Desenvolver relatório de viabilidade', idOrder: 12, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Apresentar relatório ao cliente', idOrder: 12 },

            // Order 13
            { status: TaskStatus.PENDENTE, description: 'Analisar negócios do cliente', idOrder: 13 },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano de negócios', idOrder: 13 },
            { status: TaskStatus.FINALIZADO, description: 'Implementar plano de negócios', idOrder: 13, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Monitorar progresso', idOrder: 13 },
            { status: TaskStatus.PENDENTE, description: 'Avaliar resultados do plano de negócios', idOrder: 13 },

            // Order 14
            { status: TaskStatus.PENDENTE, description: 'Analisar dados financeiros', idOrder: 14 },
            { status: TaskStatus.FINALIZADO, description: 'Desenvolver plano financeiro', idOrder: 14, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Implementar plano financeiro', idOrder: 14 },
            { status: TaskStatus.PENDENTE, description: 'Monitorar desempenho financeiro', idOrder: 14 },
            { status: TaskStatus.PENDENTE, description: 'Avaliar eficácia do plano financeiro', idOrder: 14 },

            // Order 15
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano de marketing', idOrder: 15 },
            { status: TaskStatus.PENDENTE, description: 'Implementar plano de marketing', idOrder: 15 },
            { status: TaskStatus.PENDENTE, description: 'Monitorar campanhas de marketing', idOrder: 15 },
            { status: TaskStatus.PENDENTE, description: 'Analisar resultados de marketing', idOrder: 15 },
            { status: TaskStatus.PENDENTE, description: 'Ajustar plano de marketing', idOrder: 15 },

            // Order 16
            { status: TaskStatus.PENDENTE, description: 'Implementar estratégias de vendas', idOrder: 16 },
            { status: TaskStatus.PENDENTE, description: 'Monitorar desempenho de vendas', idOrder: 16 },
            { status: TaskStatus.FINALIZADO, description: 'Avaliar resultados de vendas', idOrder: 16, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Ajustar estratégias de vendas', idOrder: 16 },
            { status: TaskStatus.PENDENTE, description: 'Preparar relatório de vendas', idOrder: 16 },

            // Order 17
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano de liderança', idOrder: 17 },
            { status: TaskStatus.PENDENTE, description: 'Treinar líderes', idOrder: 17 },
            { status: TaskStatus.PENDENTE, description: 'Implementar programa de liderança', idOrder: 17 },
            { status: TaskStatus.PENDENTE, description: 'Monitorar desempenho de liderança', idOrder: 17 },
            { status: TaskStatus.FINALIZADO, description: 'Avaliar eficácia do programa de liderança', idOrder: 17, conclusionDate: new Date() },

            // Order 18
            { status: TaskStatus.PENDENTE, description: 'Analisar processos empresariais', idOrder: 18 },
            { status: TaskStatus.FINALIZADO, description: 'Desenvolver plano de processos', idOrder: 18, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Implementar plano de processos', idOrder: 18 },
            { status: TaskStatus.PENDENTE, description: 'Monitorar processos', idOrder: 18 },
            { status: TaskStatus.PENDENTE, description: 'Avaliar eficácia do plano de processos', idOrder: 18 },

            // Order 19
            { status: TaskStatus.PENDENTE, description: 'Analisar estrutura organizacional', idOrder: 19 },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano organizacional', idOrder: 19 },
            { status: TaskStatus.PENDENTE, description: 'Implementar plano organizacional', idOrder: 19 },
            { status: TaskStatus.PENDENTE, description: 'Monitorar desempenho organizacional', idOrder: 19 },
            { status: TaskStatus.FINALIZADO, description: 'Avaliar eficácia do plano organizacional', idOrder: 19, conclusionDate: new Date() },

            // Order 20
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano de inovação', idOrder: 20 },
            { status: TaskStatus.PENDENTE, description: 'Implementar estratégias de inovação', idOrder: 20 },
            { status: TaskStatus.PENDENTE, description: 'Monitorar projetos de inovação', idOrder: 20 },
            { status: TaskStatus.FINALIZADO, description: 'Avaliar resultados de inovação', idOrder: 20, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver relatório de inovação', idOrder: 20 },

            // Order 21
            { status: TaskStatus.PENDENTE, description: 'Identificar riscos', idOrder: 21 },
            { status: TaskStatus.PENDENTE, description: 'Analisar riscos', idOrder: 21 },
            { status: TaskStatus.FINALIZADO, description: 'Desenvolver plano de mitigação de riscos', idOrder: 21, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Implementar plano de mitigação de riscos', idOrder: 21 },
            { status: TaskStatus.PENDENTE, description: 'Avaliar eficácia do plano de mitigação de riscos', idOrder: 21 },

            // Order 22
            { status: TaskStatus.PENDENTE, description: 'Analisar situação financeira', idOrder: 22 },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano financeiro', idOrder: 22 },
            { status: TaskStatus.FINALIZADO, description: 'Implementar plano financeiro', idOrder: 22, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Monitorar desempenho financeiro', idOrder: 22 },
            { status: TaskStatus.PENDENTE, description: 'Avaliar eficácia do plano financeiro', idOrder: 22 },

            // Order 23
            { status: TaskStatus.PENDENTE, description: 'Analisar dados estratégicos', idOrder: 23 },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano estratégico', idOrder: 23 },
            { status: TaskStatus.PENDENTE, description: 'Implementar plano estratégico', idOrder: 23 },
            { status: TaskStatus.FINALIZADO, description: 'Monitorar desempenho estratégico', idOrder: 23, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Avaliar eficácia do plano estratégico', idOrder: 23 },

            // Order 24
            { status: TaskStatus.PENDENTE, description: 'Coletar dados para a gestão de mudanças', idOrder: 24 },
            { status: TaskStatus.FINALIZADO, description: 'Desenvolver plano de gestão de mudanças', idOrder: 24, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Implementar plano de gestão de mudanças', idOrder: 24 },
            { status: TaskStatus.PENDENTE, description: 'Monitorar mudanças', idOrder: 24 },
            { status: TaskStatus.PENDENTE, description: 'Avaliar eficácia do plano de gestão de mudanças', idOrder: 24 },

            // Order 25
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano de TI', idOrder: 25 },
            { status: TaskStatus.PENDENTE, description: 'Implementar soluções de TI', idOrder: 25 },
            { status: TaskStatus.PENDENTE, description: 'Monitorar sistemas de TI', idOrder: 25 },
            { status: TaskStatus.PENDENTE, description: 'Avaliar desempenho de TI', idOrder: 25 },
            { status: TaskStatus.FINALIZADO, description: 'Desenvolver relatório de TI', idOrder: 25, conclusionDate: new Date() },

            // Order 26
            { status: TaskStatus.PENDENTE, description: 'Analisar competitividade de mercado', idOrder: 26 },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver estratégias competitivas', idOrder: 26 },
            { status: TaskStatus.FINALIZADO, description: 'Implementar estratégias competitivas', idOrder: 26, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Monitorar competitividade de mercado', idOrder: 26 },
            { status: TaskStatus.PENDENTE, description: 'Avaliar eficácia das estratégias competitivas', idOrder: 26 },

            // Order 27
            { status: TaskStatus.PENDENTE, description: 'Planejar auditoria interna', idOrder: 27 },
            { status: TaskStatus.PENDENTE, description: 'Coletar dados para auditoria interna', idOrder: 27 },
            { status: TaskStatus.PENDENTE, description: 'Realizar auditoria interna', idOrder: 27 },
            { status: TaskStatus.FINALIZADO, description: 'Desenvolver relatório de auditoria interna', idOrder: 27, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Avaliar resultados de auditoria interna', idOrder: 27 },

            // Order 28
            { status: TaskStatus.PENDENTE, description: 'Analisar processos de reengenharia', idOrder: 28 },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano de reengenharia', idOrder: 28 },
            { status: TaskStatus.FINALIZADO, description: 'Implementar plano de reengenharia', idOrder: 28, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Monitorar reengenharia de processos', idOrder: 28 },
            { status: TaskStatus.PENDENTE, description: 'Avaliar eficácia do plano de reengenharia', idOrder: 28 },

            // Order 29
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano de marketing para redes sociais', idOrder: 29 },
            { status: TaskStatus.PENDENTE, description: 'Implementar campanha em redes sociais', idOrder: 29 },
            { status: TaskStatus.PENDENTE, description: 'Monitorar desempenho da campanha', idOrder: 29 },
            { status: TaskStatus.PENDENTE, description: 'Analisar resultados da campanha', idOrder: 29 },
            { status: TaskStatus.FINALIZADO, description: 'Ajustar estratégias de redes sociais', idOrder: 29, conclusionDate: new Date() },

            // Order 30
            { status: TaskStatus.PENDENTE, description: 'Analisar necessidades de treinamento', idOrder: 30 },
            { status: TaskStatus.PENDENTE, description: 'Desenvolver programa de treinamento', idOrder: 30 },
            { status: TaskStatus.PENDENTE, description: 'Implementar treinamento', idOrder: 30 },
            { status: TaskStatus.FINALIZADO, description: 'Avaliar eficácia do treinamento', idOrder: 30, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Ajustar programa de treinamento', idOrder: 30 },

            // Order 31
            { status: TaskStatus.PENDENTE, description: 'Planejar estratégia de e-commerce', idOrder: 31 },
            { status: TaskStatus.FINALIZADO, description: 'Desenvolver plataforma de e-commerce', idOrder: 31, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Implementar plataforma de e-commerce', idOrder: 31 },
            { status: TaskStatus.PENDENTE, description: 'Monitorar vendas online', idOrder: 31 },
            { status: TaskStatus.PENDENTE, description: 'Avaliar desempenho de e-commerce', idOrder: 31 },

            // Order 32
            { status: TaskStatus.PENDENTE, description: 'Desenvolver plano de inovação tecnológica', idOrder: 32 },
            { status: TaskStatus.PENDENTE, description: 'Implementar novas tecnologias', idOrder: 32 },
            { status: TaskStatus.FINALIZADO, description: 'Monitorar adoção tecnológica', idOrder: 32, conclusionDate: new Date() },
            { status: TaskStatus.PENDENTE, description: 'Avaliar impacto das tecnologias', idOrder: 32 },
            { status: TaskStatus.PENDENTE, description: 'Ajustar plano de inovação', idOrder: 32 },
        ];

        await Task.bulkCreate(data);
    } catch (error) {
        console.error('Erro ao popular o banco de dados:', error);
    }
};
