
import { OrderStatus } from "@backend/enums/OrderStatus";
import { IAppError } from "@backend/interface/IAppError";
import Order from "@backend/models/Order";
import AlertError from "@renderer/components/AlertError";
import Container from "@renderer/components/Container";
import GenericTable from "@renderer/components/GenericTable";
import PaginationControls from "@renderer/components/PaginationControls";
import Title from "@renderer/components/Title";
import OrderIPC from "@renderer/ipc/OrderIPC";
import formatDate from "@renderer/utils/formatDate";
import { Badge, Button, Dropdown, FloatingLabel } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Orders() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [searchText, setSearchText] = useState<string>('')
    const [filterStatus, setFilterStatus] = useState<OrderStatus>(OrderStatus.ATIVO);

    const navigate = useNavigate()

    const [data, setData] = useState<Order[]>([])
    const [count, setCount] = useState<number>(0);

    const [error, setError] = useState<IAppError | null>(null)

    const fetchData = async () => {
        OrderIPC.findAll(searchText, currentPage, filterStatus).then((res) => {
            setData(res.data)
            setCount(res.count)
            setError(null);
        }).catch((err: IAppError) => {
            setError(err)
        })
    };

    useEffect(() => {
        fetchData()
    }, [searchText, currentPage, filterStatus]);


    const onPageChange = (page: number) => setCurrentPage(page)
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchText(event.target.value)

    const columns = [
        {
            header: 'Cliente',
            accessor: (data: Order) => (
                <div>
                    {data.Client.name}
                    <p className="text-xs text-gray-500">{data.theme}</p>
                </div>
            ),
            className: 'whitespace-nowrap font-medium text-gray-900'
        },
        {
            header: 'Serviço',
            accessor: (data: Order) => data.Service.description
        },
        {
            header: 'Entrega',
            accessor: (data: Order) => formatDate(data.deliveryDate)
        },
        {
            header: 'Situação',
            accessor: (data: Order) => (
                <Badge color={data.status == OrderStatus.ATIVO ? "warning" : "success"} className="flex justify-center items-center">
                    {OrderStatus[data.status]}
                </Badge>
            ),
        },
        {
            header: 'Ações',
            accessor: (data: Order) => (
                <Link to={`/orders/${data.id}`} className="font-medium text-cyan-600 hover:underline">
                    Visualizar
                </Link>
            )
        }
    ];


    return (
        <Container>
            <Title disabled>Pedidos</Title>
            {/* Exibe alerta de erro, se houver */}
            <AlertError appError={error} onClose={() => setError(null)} />
            <div className="grid grid-cols-4 items-start gap-x-4">
                <div className="col-span-2">
                    <FloatingLabel
                        variant="standard"
                        label="Buscar"
                        type="text"
                        value={searchText}
                        onChange={handleSearch}
                    />
                </div>
                <div className="flex items-center gap-x-4 z-50">
                    <p>Filtrar por:</p>
                    <Dropdown color="gray" label={filterStatus ? OrderStatus[filterStatus] : "TODOS"}>
                        <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.ATIVO)}>ATIVO</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.FINALIZADO)}>FINALIZADO</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.TODOS)}>TODOS</Dropdown.Item>
                    </Dropdown>
                </div>
                <div className="flex justify-end">
                    <Button onClick={() => navigate('/orders/create')}>Novo</Button>
                </div>
            </div>
            <GenericTable data={data} columns={columns} keyExtractor={(data: Order) => data.id} />
            <PaginationControls
                currentPage={currentPage}
                totalRecords={count}
                onPageChange={onPageChange}
            />
        </Container>);
}

export default Orders;