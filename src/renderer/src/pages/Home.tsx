import React, { useState, useEffect } from 'react'
import Container from '@renderer/components/Container'
import OrdersCalendar from '@renderer/components/OrdersCalendar'
import Order from '@backend/models/Order'
import OrderIPC from '@renderer/ipc/OrderIPC'
import { classNames } from '@renderer/utils/classNames'
import TaskIPC from '@renderer/ipc/TaskIPC'
import Task from '@backend/models/Task'
import TasksList from '@renderer/components/TasksList'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TaskStatus } from '@backend/enums/TaskStatus'
import AlertError from '@renderer/components/AlertError'
import { IAppError } from '@backend/interface/IAppError'

const fetchOrders = async (): Promise<Order[]> => {
  const response = await OrderIPC.findAllPeding()
  return response.data
}

const fetchTasks = async (): Promise<Task[]> => {
  return TaskIPC.findAll()
}

const updateTask = async (task: Task) => {
  const updatedTask = { ...task, status: TaskStatus.FINALIZADO, conclusionDate: new Date() } as Task
  await TaskIPC.update(updatedTask)
}

const Home: React.FC = () => {
  const [error, setError] = useState<IAppError | null>(null)
  const queryClient = useQueryClient()

  const { data: orders = [] } = useQuery<Order[]>({ queryKey: ['orders'], queryFn: fetchOrders })
  const { data: tasks = [] } = useQuery<Task[]>({ queryKey: ['tasks'], queryFn: fetchTasks })

  const { mutateAsync: upTask } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: (err) => {
      setError(err)
    }
  })

  return (
    <Container>
      <AlertError appError={error} onClose={() => null} />
      <div className={classNames('grid h-full gap-6 ', tasks.length > 0 ? ' grid-cols-3' : '')}>
        <div className="col-span-2">
          <OrdersCalendar orders={orders} />
        </div>
        {tasks.length > 0 && (
          <div className="col-span-1 overflow-auto">
            <TasksList tasks={tasks} updateTask={upTask} />
          </div>
        )}
      </div>
    </Container>
  )
}

export default Home
