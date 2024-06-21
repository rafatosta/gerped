import { OrderStatus } from "@backend/enums/OrderStatus";
import Order from "@backend/models/Order";
import Container from "@renderer/components/Container";
import FloatingSelect from "@renderer/components/FloatingSelect";
import Title from "@renderer/components/Title";
import { useClient } from "@renderer/hooks/useClient";
import { useOrder } from "@renderer/hooks/useOrder";
import { useService } from "@renderer/hooks/useService";
import formatDate from "@renderer/utils/formatDate";
import { Button, FloatingLabel } from "flowbite-react";
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

    const { data: dataService } = useService()
    const { save, findById } = useOrder()
    const { data: dataClient } = useClient()

    useEffect(() => {
        console.log('order:', orderId, 'client:', clientId);
        console.log(dataService);

        if (orderId) {
            console.log('Buscar Order id:', orderId);
            const fetchOrder = async (): Promise<Order> => {
                return await findById(orderId);
            }

            fetchOrder()
                .then(data => {
                    console.log(data);
                    setOrder(data)
                })
                .catch(error => {
                    console.error('Erro ao buscar order:', error);
                });
        } else if (clientId) {
            console.log('bucar cliente apenas');
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
                <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 z-50 p-2">
                    <Button color="red" onClick={() => navigate(-1)}>
                        Cancelar
                    </Button>
                    <Button type="submit">Salvar</Button>
                </div>
            </form>

            <div>
                <h1>Detalhes do Pedido</h1>
                <ul>
                    <li><span className="label">ID:</span> {order?.id}</li>
                    <li><span className="label">ID do Cliente:</span> {order.idClient}</li>
                    <li><span className="label">ID do Serviço:</span> {order.idService}</li>
                    <li><span className="label">Tema:</span> {order.theme}</li>
                    <li><span className="label">Data do Pedido:</span> {formatDate(order.orderDate)}</li>
                    <li><span className="label">Data de Entrega:</span> {formatDate(order.deliveryDate)}</li>
                    <li><span className="label">Preço:</span> {order.price.toFixed(2)}</li>
                    <li><span className="label">Status:</span> {order.status}</li>
                </ul>
            </div>
        </Container>
    );
}

export default OrderForm;
