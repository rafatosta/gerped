import { OrderStatus } from "@backend/enums/OrderStatus";
import Client from "@backend/models/Client";
import Order from "@backend/models/Order";
import Service from "@backend/models/Service";
import Task from "@backend/models/Task";
import { Op, Sequelize } from "sequelize";

class TaskDAO {


    static async getTasksByOrderDeliveryDate(): Promise<Task[]> {

        try {
            const tasks = await Task.findAll({
                include: {
                    model: Order,
                    as: 'Order',
                    where: {
                        status: { [Op.is]: OrderStatus.ATIVO }
                    },
                    include: [{
                        model: Client,
                        attributes: ['name']
                    }, {
                        model: Service,
                        attributes: ['description']
                    }
                    ]
                },
                where: {
                    conclusionDate: {
                        [Op.is]: undefined,
                    },
                },
                order: [[Sequelize.col('Order.deliveryDate'), 'ASC']], // Order by Order.deliveryDate
                raw: true,
                nest: true
            });

            return tasks as Task[];
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error; // Re-throw for handling at a higher level
        }
    }
}

export default TaskDAO;