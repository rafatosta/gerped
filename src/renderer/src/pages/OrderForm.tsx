import { OrderStatus } from '@backend/enums/OrderStatus'
import { TaskStatus } from '@backend/enums/TaskStatus'
import { IAppError } from '@backend/interface/IAppError'
import Client from '@backend/models/Client'
import Order from '@backend/models/Order'
import Service from '@backend/models/Service'
import Task from '@backend/models/Task'
import AlertError from '@renderer/components/AlertError'
import Container from '@renderer/components/Container'
import FloatingSelect from '@renderer/components/FloatingSelect'
import GenericTable from '@renderer/components/GenericTable'
import Title from '@renderer/components/Title'
import ClientIPC from '@renderer/ipc/ClientIPC'
import OrderIPC from '@renderer/ipc/OrderIPC'
import ServiceIPC from '@renderer/ipc/ServiceIPC'
import formatDate from '@renderer/utils/formatDate'
import { useQuery } from '@tanstack/react-query'
import { Button, Checkbox, FloatingLabel, Label } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function OrderForm() {
  // Obtém os parâmetros da URL
  const { orderId, clientId } = useParams<{ orderId?: string; clientId?: string }>()

  // Hook do React Router para navegação entre páginas
  const navigate = useNavigate()

  // Estado para armazenar os dados do pedido
  const [order, setOrder] = useState<Order>({
    idClient: 0,
    idService: 0,
    theme: '',
    orderDate: new Date(),
    deliveryDate: new Date(),
    price: 0,
    status: OrderStatus.ATIVO
  } as Order)

  // Estado para armazenar a nova tarefa a ser adicionada
  const [newTask, setNewTask] = useState<string>('')
  // Estado para armazenar erros
  const [error, setError] = useState<IAppError | null>(null)

  const { data: clientsData } = useQuery<Client[]>({
    queryKey: ['clientsAll'],
    queryFn: async () => {
      const data = await ClientIPC.findAll()
      return data.data
    }
  })

  const { data: servicesData } = useQuery<Service[]>({
    queryKey: ['servicesAll'],
    queryFn: async () => {
      const data = await ServiceIPC.findAll()
      return data.data
    }
  })

  const dataClient = clientsData || []
  const dataService = servicesData || []

  // Função assíncrona para buscar o pedido com base no parâmetro da página
  const fetchOrder = async (orderId: string) => {
    try {
      const data = await OrderIPC.findById(orderId)
      setOrder(data)
    } catch (err) {
      setError(err as IAppError)
    }
  }

  // UseEffect para buscar dados do pedido e preencher os dados de clientes e serviços
  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId)
    } else if (clientId) {
      setOrder(
        (prevOrder) =>
          ({
            ...prevOrder,
            idClient: parseInt(clientId)
          }) as Order
      )
    }
  }, [orderId, clientId])

  // Função para lidar com mudanças nos inputs do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setOrder(
      (prevOrder) =>
        ({
          ...prevOrder,
          [name]:
            name === 'price'
              ? parseFloat(value)
              : name === 'orderDate' || name === 'deliveryDate'
                ? new Date(value)
                : value
        }) as Order
    )
  }

  // Função para remover pedido
  const handleRemoveOrder = async () => {
    try {
      await OrderIPC.delete(order.id)
      navigate(-1)
    } catch (err: unknown) {
      setError(err as IAppError)
    }
  }

  // Função para salvar pedido
  const handleSave = async () => {
    try {
      await OrderIPC.save(order)
      navigate(-1)
    } catch (err: unknown) {
      setError(err as IAppError)
    }
  }

  // Função para alterar o status da tarefa
  const handleTaskStatusChange = (index: number) => {
    const updateTasks = [...(order.Tasks ?? [])]
    const updatedStatus =
      updateTasks[index].status === TaskStatus.FINALIZADO
        ? TaskStatus.PENDENTE
        : TaskStatus.FINALIZADO
    const updateConclusionDate = updatedStatus === TaskStatus.FINALIZADO ? new Date() : ''

    updateTasks[index] = {
      ...updateTasks[index],
      status: updatedStatus,
      conclusionDate: updateConclusionDate
    } as Task
    setOrder((prevOrder) => ({ ...prevOrder, Tasks: updateTasks }) as Order)
  }

  // Função para alterar a descrição da tarefa
  const handleTaskDescriptionChange = (index: number, description: string) => {
    const updateTasks = [...(order.Tasks ?? [])]
    updateTasks[index] = { ...updateTasks[index], description } as Task
    setOrder((prevOrder) => ({ ...prevOrder, Tasks: updateTasks }) as Order)
  }

  // Função para deletar tarefa
  const handleTaskDelete = (index: number) => {
    const updateTasks = [...(order.Tasks ?? [])]
    updateTasks.splice(index, 1)
    setOrder((prevOrder) => ({ ...prevOrder, Tasks: updateTasks }) as Order)
  }

  // Função para criar nova tarefa
  const createTask = () => {
    if (newTask.trim()) {
      const updateTasks = [...(order.Tasks ?? [])]
      const createNewTask = {
        description: newTask,
        status: TaskStatus.PENDENTE,
        idOrder: order.id
      } as Task
      setOrder((prevOrder) => ({ ...prevOrder, Tasks: [...updateTasks, createNewTask] }) as Order)
      setNewTask('')
    }
  }

  // Definição das colunas da tabela de tarefas
  const columns = [
    {
      header: 'Situação',
      accessor: (data: Task, index: number) => (
        <div className="flex justify-start items-center gap-2">
          <Checkbox
            id={`task-${index}`}
            checked={data.status === TaskStatus.FINALIZADO}
            onChange={() => handleTaskStatusChange(index)}
          />
          <Label htmlFor={`task-${index}`}>
            {TaskStatus[data.status][0].toUpperCase() +
              TaskStatus[data.status].substring(1).toLowerCase()}
          </Label>
        </div>
      )
    },
    {
      header: 'Tarefa',
      accessor: (data: Task, index: number) => (
        <FloatingLabel
          variant="standard"
          label="Descrição"
          name="task"
          type="text"
          value={data.description}
          onChange={(e) => handleTaskDescriptionChange(index, e.target.value)}
        />
      )
    },
    {
      header: 'Conclusão',
      accessor: (data: Task) => (data.conclusionDate ? formatDate(data.conclusionDate) : '')
    },
    {
      header: 'Ações',
      accessor: (_: Task, index: number) => (
        <button
          className="font-medium text-red-600 hover:underline"
          onClick={() => handleTaskDelete(index)}
        >
          Excluir
        </button>
      )
    }
  ]

  return (
    <Container>
      {/* Cabeçalho com título do Pedido e número de identificação, se disponível */}
      <div className="flex justify-between items-center gap-4">
        <Title>Pedido</Title>
        {orderId && <p className="text-gray-400 italic text-lg">#{orderId}</p>}
      </div>

      {/* Exibe alerta de erro, se houver */}
      <AlertError appError={error} onClose={() => setError(null)} />

      {/* Formulário para edição de dados do Pedido */}
      <form
        className="flex flex-col gap-1"
        onSubmit={(e) => {
          e.preventDefault()
          handleSave()
        }}
      >
        {/* Grid com duas colunas para seleção de Cliente e Serviço */}
        <div className="grid grid-cols-2 gap-2">
          {/* Dropdown para seleção de Cliente */}
          <FloatingSelect
            label={order.idClient ? 'Cliente' : 'Selecione o cliente'}
            name="idClient"
            value={order.idClient || ''}
            disabled={!orderId && !clientId ? false : true}
            onChange={handleChange}
            required
          >
            {dataClient.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </FloatingSelect>

          {/* Dropdown para seleção de Serviço */}
          <FloatingSelect
            label={order.idService ? 'Serviço' : 'Selecione o serviço'}
            name="idService"
            value={order.idService}
            onChange={handleChange}
            required
          >
            {dataService.map((s) => (
              <option key={s.id} value={s.id}>
                {s.description}
              </option>
            ))}
          </FloatingSelect>
        </div>

        {/* Campo de entrada para o tema do Pedido */}
        <FloatingLabel
          variant="filled"
          label="Tema"
          name="theme"
          value={order.theme}
          type="text"
          onChange={handleChange}
          required
        />

        {/* Grid com duas colunas para data de pedido e data de entrega */}
        <div className="grid grid-cols-2 gap-2">
          {/* Campo de entrada para data de pedido */}
          <FloatingLabel
            variant="filled"
            label="Data do pedido"
            name="orderDate"
            value={new Date(order.orderDate).toISOString().slice(0, 10)}
            type="date"
            onChange={handleChange}
            required
          />

          {/* Campo de entrada para data de entrega */}
          <FloatingLabel
            variant="filled"
            label="Data de entrega"
            name="deliveryDate"
            value={new Date(order.deliveryDate).toISOString().slice(0, 10)}
            type="date"
            onChange={handleChange}
            required
          />
        </div>

        {/* Grid com duas colunas para valor e status do Pedido */}
        <div className="grid grid-cols-2 gap-2">
          {/* Campo de entrada para valor do Pedido */}
          <FloatingLabel
            variant="filled"
            value={order.price}
            label="Valor"
            name="price"
            type="number"
            onChange={handleChange}
            required
          />

          {/* Dropdown para seleção de status do Pedido */}
          <FloatingSelect
            label="Status do pedido"
            name="status"
            value={order.status}
            onChange={handleChange}
            required
          >
            <option value={OrderStatus.ATIVO}>Ativo</option>
            <option value={OrderStatus.FINALIZADO}>Finalizado</option>
          </FloatingSelect>
        </div>

        {/* Botões de ação no rodapé do formulário */}
        <div className="pl-64 ml-4 absolute inset-x-0 bottom-0 flex justify-between items-center gap-2 z-50 p-2">
          {/* Botão para excluir o Pedido */}
          <Button color="yellow" onClick={handleRemoveOrder}>
            Excluir pedido
          </Button>

          {/* Grupo de botões para cancelar e salvar o Pedido */}
          <div className="flex items-center gap-2">
            <Button color="red" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </div>
      </form>

      {/* Título da lista de tarefas */}
      <Title disabled>Lista de Tarefas</Title>

      {/* Grid com duas colunas para adicionar nova tarefa e botão de adicionar */}
      <div className="grid grid-cols-2 items-center gap-2">
        {/* Campo de entrada para nova tarefa */}
        <FloatingLabel
          variant="standard"
          label="Nova tarefa"
          name="newTask"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        {/* Botão para adicionar nova tarefa */}
        <Button className="w-fit" onClick={createTask}>
          Adicionar
        </Button>
      </div>

      {/* Tabela de tarefas associadas ao Pedido */}
      {order.Tasks && (
        <GenericTable data={order.Tasks} columns={columns} keyExtractor={(data: Task) => data.id} />
      )}

      {/* Espaço em branco no final para melhorar a visualização */}
      <div className="h-12" />
    </Container>
  )
}

export default OrderForm
