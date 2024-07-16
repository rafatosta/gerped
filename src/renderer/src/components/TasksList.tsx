import Task from '@backend/models/Task'
import { FaCheck, FaEye } from 'react-icons/fa'
import Title from './Title'
import { Link } from 'react-router-dom'
import { Popover } from 'flowbite-react'

interface TasksListProps {
  tasks: Task[]
  updateTask: any
}

function TasksList({ tasks, updateTask }: TasksListProps) {
  return (
    <div className="flex flex-col overflow-auto">
      <Title disabled>Tarefas</Title>
      <div className="overflow-auto">
        <ul role="list" className="grid grid-cols-1 gap-4 m-2 min-w-3xl">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow shadow-gray-400"
            >
              <h3 className=" p-4 font-semibold text-gray-800">{task.description}</h3>
              <div>
                <div className="grid grid-cols-2 divide-x divide-gray-200 py-2">

                  <button
                    onClick={() => updateTask(task)}
                    className="flex justify-center items-center gap-x-1 text-sm font-semibold text-gray-900"
                  >
                    <FaCheck className="text-gray-400" />
                    Concluir
                  </button>

                  <Popover
                    aria-labelledby="default-popover"
                    content={
                      <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                        <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                          <h3 id="default-popover" className="font-semibold text-gray-900 dark:text-white">Detalhres da tarefa</h3>
                        </div>
                        <div className="flex flex-col px-3 py-2">
                          <Link
                            to={`/orders/${task.Order.id}`}
                            className="mt-1 truncate text-sm text-gray-500 hover:text-cyan-600 hover:underline"
                          >
                            <span className='text-gray-900'>Tema: </span>{task.Order.theme}
                          </Link>
                          <Link
                            to={`/clients/${task.Order.Client.id}`}
                            className="mt-1 truncate text-sm text-gray-500 hover:text-cyan-600 hover:underline"
                          >
                            <span className='text-gray-900'>Cliente: </span> {task.Order.Client.name}
                          </Link>
                        </div>
                      </div>
                    }
                  >
                    <button
                      className="flex justify-center items-center gap-x-1 text-sm font-semibold text-gray-900"
                    >
                      <FaEye className='text-gray-400' />
                      Detalhes
                    </button>
                  </Popover>

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
