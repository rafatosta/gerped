import Task from '@backend/models/Task'
import { FaCheck } from 'react-icons/fa'
import Title from './Title'
import { Link } from 'react-router-dom'

interface TasksListProps {
  tasks: Task[]
  updateTask: any
}

function TasksList({ tasks, updateTask }: TasksListProps) {
  return (
    <div className="flex flex-col overflow-auto">
      <Title disabled>Tarefas</Title>
      <div className="overflow-auto">
        <ul role="list" className="grid grid-cols-1 gap-4 m-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow shadow-gray-400"
            >
              <div className="flex w-full items-center justify-between p-4">
                <div className="flex flex-col truncate">
                  <h3 className="truncate font-semibold text-gray-800">{task.description}</h3>

                  <Link
                    to={`/orders/${task.Order.id}`}
                    className="mt-1 truncate text-sm text-gray-500 hover:text-cyan-600 hover:underline"
                  >
                    {task.Order.theme}
                  </Link>
                  <Link
                    to={`/clients/${task.Order.Client.id}`}
                    className="mt-1 truncate text-sm text-gray-500 hover:text-cyan-600 hover:underline"
                  >
                    {task.Order.Client.name}
                  </Link>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <button
                      onClick={() => updateTask(task)}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-3 text-sm font-semibold text-gray-900"
                    >
                      <FaCheck className="text-gray-400" />
                      Concluir
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TasksList
