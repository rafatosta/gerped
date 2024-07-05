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
import { useQuery } from "@tanstack/react-query";
import { Badge, Button, Dropdown, FloatingLabel, Progress } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Orders() {

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchText, setSearchText] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<OrderStatus>(OrderStatus.ATIVO);

    const [error, setError] = useState<IAppError | null>(null);

    const { data } = useQuery<{ data: Order[]; count: number }>(
        {
            queryKey: ['orders', searchText, currentPage, filterStatus],
            queryFn: async () => {
                return await OrderIPC.findAll(searchText, currentPage, filterStatus);
            },
        }
    );

    const orders = data?.data || [];
    const count = data?.count || 0;

    const onPageChange = (page: number) => setCurrentPage(page);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchText(event.target.value);


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
            header: 'Progresso',
            accessor: (data: Order) =>
                data.countTask == 0 ?
                    "-" :
                    <Progress progress={100 * data.countTaskFinished / data.countTask}
                        progressLabelPosition="outside"
                        labelProgress
                        size="sm"
                    />
        },
        {
            header: 'Situação',
            accessor: (data: Order) => (
                <Badge color={data.status === OrderStatus.ATIVO ? "warning" : "success"} className="flex justify-center items-center">
                    {OrderStatus[data.status]}
                </Badge>
            ),
        },
        {
            header: '',
            accessor: (data: Order) => (
                <Link to={`/orders/${data.id}`} className="font-medium text-cyan-600 hover:underline">
                    Visualizar
                </Link>
            )
        }
    ];

    return (
        <Container>
            {/* Título desabilitado para a página de Pedidos */}
            <Title disabled>Pedidos</Title>

            {/* Exibe alerta de erro, se houver */}
            <AlertError appError={error} onClose={() => setError(null)} />

            {/* Grid com quatro colunas para busca, filtro por status e botão de novo pedido */}
            <div className="grid grid-cols-4 items-start gap-x-4">
                {/* Coluna para campo de busca */}
                <div className="col-span-2">
                    <FloatingLabel
                        variant="standard"
                        label="Buscar"
                        type="text"
                        value={searchText}
                        onChange={handleSearch}
                    />
                </div>

                {/* Coluna para filtro por status */}
                <div className="flex items-center gap-x-4 z-50">
                    <p>Filtrar por:</p>
                    {/* Dropdown para selecionar o status dos pedidos */}
                    <Dropdown color="gray" label={filterStatus ? OrderStatus[filterStatus] : "TODOS"}>
                        <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.ATIVO)}>ATIVO</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.FINALIZADO)}>FINALIZADO</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.TODOS)}>TODOS</Dropdown.Item>
                    </Dropdown>
                </div>

                {/* Coluna para botão de novo pedido */}
                <div className="flex justify-end">
                    <Button onClick={() => navigate('/orders/create')}>Novo</Button>
                </div>
            </div>

            {/* Tabela de pedidos com dados e colunas definidas */}
            <GenericTable data={orders} columns={columns} keyExtractor={(data: Order) => data.id} />

            {/* Controles de paginação para navegar entre páginas de pedidos */}
            <PaginationControls
                currentPage={currentPage}
                totalRecords={count}
                onPageChange={onPageChange}
            />
        </Container>

    );
}

export default Orders;
