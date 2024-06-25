import { OrderStatus } from "@backend/enums/OrderStatus";
import { TaskStatus } from "@backend/enums/TaskStatus";
import Order from "@backend/models/Order";
import Task from "@backend/models/Task";
import Container from "@renderer/components/Container";
import FloatingSelect from "@renderer/components/FloatingSelect";
import GenericTable from "@renderer/components/GenericTable";
import Title from "@renderer/components/Title";
import { useClient } from "@renderer/hooks/useClient";
import { useOrder } from "@renderer/hooks/useOrder";
import { useService } from "@renderer/hooks/useService";
import formatDate from "@renderer/utils/formatDate";
import { Button, Checkbox, FloatingLabel, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function OrderForm() {

    const { orderId, clientId } = useParams<{ orderId?: string; clientId?: string }>()

    const navigate = useNavigate()

    const [order, setOrder] = useState<Order>({
        idClient: 0,
        idService: 0,
        theme: "",
        orderDate: new Date(),
        deliveryDate: new Date(),
        price: 0,
        status: OrderStatus.ATIVO,
    } as Order)

    const [newTask, setNewTask] = useState<string>('')

    const { data: dataService } = useService()
    const { save, findById } = useOrder()
    const { data: dataClient } = useClient()

    const fetchOrder = async (orderId: string): Promise<Order> => {
        return await findById(orderId);
    }

    useEffect(() => {
        if (orderId) { // Buscar Order pelo ID
            fetchOrder(orderId)
                .then(data => {
                    setOrder(data)
                })

        } else if (clientId) { // Definir o ID do cliente em nova Order
            setOrder((prevOrder) => ({
                ...prevOrder,
                idClient: parseInt(clientId)
            } as Order))
        }

    }, [orderId, clientId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, value);

        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]: name === 'price' ? parseFloat(value) : (name === 'orderDate' || name === 'deliveryDate') ? new Date(value) : value,
        } as Order));

    };

    const handleSave = async () => {
        console.log(order)
        save(order)
        navigate(-1)
    }

    const handleTaskStatusChange = (index: number) => {
        const updateTasks = [...(order.Tasks ?? [])];
        const updatedStatus =
            updateTasks[index].status === TaskStatus.FINALIZADO
                ? TaskStatus.PENDENTE
                : TaskStatus.FINALIZADO;
        const updateConclusionDate = updateTasks[index].status === TaskStatus.FINALIZADO
            ? ""
            : new Date();

        updateTasks[index] = { ...updateTasks[index], status: updatedStatus, conclusionDate: updateConclusionDate } as Task;
        setOrder((prevOrder) => ({ ...prevOrder, Tasks: updateTasks } as Order));
    };

    const handleTaskDescriptionChange = (index: number, description: string) => {
        const updateTasks = [...(order.Tasks ?? [])];
        updateTasks[index] = { ...updateTasks[index], description } as Task
        setOrder((prevOrder) => ({ ...prevOrder, Tasks: updateTasks } as Order));
    }

    const handleTaskDelete = (index: number) => {
        const updateTasks = [...(order.Tasks ?? [])];
        updateTasks.splice(index, 1)
        setOrder((prevOrder) => ({ ...prevOrder, Tasks: updateTasks } as Order));
    }

    const createTask = () => {
        if (newTask.trim()) {
            console.log(newTask);
            const updateTasks = [...(order.Tasks ?? [])];
            const createNewTask = { description: newTask, status: TaskStatus.PENDENTE, idOrder: order.id } as Task
            console.log(createNewTask);
            setOrder((prevOrder) => ({ ...prevOrder, Tasks: [...updateTasks, createNewTask] } as Order));

            setNewTask('')
        }
    }

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
                        {TaskStatus[data.status][0].toUpperCase() + TaskStatus[data.status].substring(1).toLowerCase()}
                    </Label>
                </div>
            )
        },
        {
            header: 'Terefa',
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
            accessor: (data: Task) => data.conclusionDate ? formatDate(data.conclusionDate) : ""
        },
        {
            header: 'Ações',
            accessor: (_: Task, index: number) => (
                <button className="font-medium text-red-600 hover:underline" onClick={() => handleTaskDelete(index)}>
                    Excluir
                </button>
            )
        }
    ];

    return (
        <Container>
            <div className="flex justify-between items-center gap-4">
                <Title>Pedido</Title>
                {orderId && <p className="text-gray-400 italic text-lg">#{orderId}</p>}
            </div>

            <form
                className="flex flex-col gap-1"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSave()
                }}
            >
                <div className="grid grid-cols-2 gap-2">
                    <FloatingSelect
                        label={order.idClient ? "Cliente" : "Selecione o cliente"}
                        name="idClient"
                        value={order.idClient || ''}
                        disabled={!orderId && !clientId ? false : true}
                        onChange={handleChange}
                        required
                    >
                        {
                            dataClient.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.name}
                                </option>
                            ))
                        }

                    </FloatingSelect>

                    <FloatingSelect
                        label={order.idService ? "Serviço" : "Selecione o serviço"}
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
                <FloatingLabel
                    variant="filled"
                    label="Tema"
                    name="theme"
                    value={order.theme}
                    type="text"
                    onChange={handleChange}
                    required
                />
                <div className="grid grid-cols-2 gap-2">
                    <FloatingLabel
                        variant="filled"
                        label="Data do pedido"
                        name="orderDate"
                        value={new Date(order.orderDate).toISOString().slice(0, 10)}
                        type="date"
                        onChange={handleChange}
                        required
                    />
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
                <div className="grid grid-cols-2 gap-2">
                    <FloatingLabel
                        variant="filled"
                        value={order.price}
                        label="Valor"
                        name="price"
                        type="number"
                        onChange={handleChange}
                        required
                    />
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
                <div className="pl-64 ml-4 absolute inset-x-0 bottom-0 flex justify-between items-center gap-2 z-50 p-2">
                    <Button color="yellow" onClick={() => navigate(-1)}>
                        Excluir pedido
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button color="red" onClick={() => navigate(-1)}>
                            Cancelar
                        </Button>
                        <Button type="submit">Salvar</Button>
                    </div>

                </div>
            </form>
            <Title disabled>Lista de Tarefas</Title>
            <div className="grid grid-cols-2 items-center gap-2">
                <FloatingLabel
                    variant="standard"
                    label="Nova tarefa"
                    name="newTask"
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <Button className="w-fit"
                    onClick={createTask}
                >Adicionar</Button>
            </div>

            {order.Tasks && (
                <GenericTable data={order.Tasks} columns={columns} keyExtractor={(data: Task) => data.id} />
            )}
            <div className="h-12" />
        </Container>
    );
}

export default OrderForm;
