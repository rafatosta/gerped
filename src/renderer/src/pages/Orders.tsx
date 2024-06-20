
import { OrderStatus } from "@backend/enums/OrderStatus";
import Order from "@backend/models/Order";
import Container from "@renderer/components/Container";
import GenericTable from "@renderer/components/GenericTable";
import PaginationControls from "@renderer/components/PaginationControls";
import Title from "@renderer/components/Title";
import { useOrder } from "@renderer/hooks/useOrder";
import formatDate from "@renderer/utils/formatDate";
import { Badge, Button, Dropdown, FloatingLabel } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [searchText, setSearchText] = useState<string>('')
    const [filterStatus, setFilterStatus] = useState<OrderStatus>(OrderStatus.ATIVO);


    const { data, count, save } = useOrder(searchText, currentPage, filterStatus)

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
                <div className="flex items-center gap-x-4">
                    <p>Filtrar por:</p>
                    <Dropdown color="gray" label={filterStatus ? OrderStatus[filterStatus] : "TODOS"}>
                        <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.ATIVO)}>ATIVO</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.FINALIZADO)}>FINALIZADO</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.TODOS)}>TODOS</Dropdown.Item>
                    </Dropdown>
                </div>
                <div className="flex justify-end">
                    <Button >Novo</Button>
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