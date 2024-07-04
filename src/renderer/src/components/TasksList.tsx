import Task from "@backend/models/Task";
import { FaCheck } from "react-icons/fa";
import Title from "./Title";

interface TasksListProps {
    tasks: Task[]
}

function TasksList({ tasks }: TasksListProps) {

    const handleTaskStatusChange = (task: Task) => {
        console.log('Concluir task: ', task.id);

    }

    return (
        <div className='flex flex-col overflow-auto'>
            <Title disabled>Tarefas</Title>
            <div className='overflow-auto'>
                <ul role="list" className="grid grid-cols-1 gap-4 m-2">
                    {tasks.map((task) => (
                        <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow shadow-gray-400">
                            <div className="flex w-full items-center justify-between p-4">
                                <div className="flex-1 truncate">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="truncate font-semibold text-gray-800">{task.description}</h3>
                                    </div>
                                    <p className="mt-1 truncate text-sm text-gray-500">Tema: {task.Order.theme}</p>
                                    <p className="mt-1 truncate text-sm text-gray-500">Cliente: {task.Order.Client.name}</p>
                                </div>
                            </div>
                            <div>
                                <div className="-mt-px flex divide-x divide-gray-200">
                                    <div className="flex w-0 flex-1">
                                        <button onClick={() => handleTaskStatusChange(task)}
                                            className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-3 text-sm font-semibold text-gray-900">
                                            <FaCheck className='text-gray-400' />
                                            Concluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>);
}

export default TasksList;