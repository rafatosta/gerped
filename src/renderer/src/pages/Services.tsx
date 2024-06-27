import { IAppError } from "@backend/interface/IAppError";
import Service from "@backend/models/Service";
import AlertError from "@renderer/components/AlertError";
import Container from "@renderer/components/Container";
import GenericTable from "@renderer/components/GenericTable";
import PaginationControls from "@renderer/components/PaginationControls";
import ServiceFormModal from "@renderer/components/ServiceFromModal";
import Title from "@renderer/components/Title";
import ServiceIPC from "@renderer/ipc/ServiceIPC";
import { FloatingLabel, Button } from "flowbite-react";
import { useEffect, useState } from "react";


function Services() {
    const [searchText, setSearchText] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [data, setData] = useState<Service[]>([]);
    const [count, setCount] = useState<number>(0);

    const [error, setError] = useState<IAppError | null>(null);

    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Função para carregar os serviços do banco de dados
    const fetchData = async () => {
        try {
            const res = await ServiceIPC.findAll(searchText, currentPage);
            setData(res.data);
            setCount(res.count);
            setError(null);
        } catch (err) {
            setError(err as IAppError);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchText, currentPage]);

    // Função para mudar a página atual
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Função para atualizar o texto de busca e resetar para a primeira página
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        setCurrentPage(1); // Reset para a primeira página ao buscar
    };

    // Função para editar um serviço
    const handleEdit = async (data: Service) => {
        setSelectedService(data);
        setIsModalOpen(true);
    };

    // Função para deletar um serviço
    const handleDelete = async (data: Service) => {
        try {
            await ServiceIPC.delete(data.id);
            fetchData();
        } catch (err) {
            setError(err as IAppError);
        }
    };

    // Função para salvar um serviço
    const handleSave = async (service: Service) => {
        try {
            await ServiceIPC.save(service);
            setIsModalOpen(false);
            setSearchText("");
            setCurrentPage(1);
            fetchData();
        } catch (err) {
            setError(err as IAppError);
        }
    };

    // Função para fechar o modal de formulário
    const onCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    // Definição das colunas da tabela de serviços
    const columns = [
        {
            header: 'Descrição',
            accessor: (data: Service) => data.description,
            className: 'whitespace-nowrap font-medium text-gray-900'
        },
        {
            header: '',
            accessor: (data: Service) => (
                <button
                    className="font-medium text-green-600 hover:underline"
                    onClick={() => handleEdit(data)}
                >
                    Editar
                </button>
            )
        },
        {
            header: '',
            accessor: (data: Service) => (
                <button
                    className="font-medium text-red-600 hover:underline"
                    onClick={() => handleDelete(data)}
                >
                    Apagar
                </button>
            ),
        }
    ];

    return (
        <Container>
            {/* Título da página */}
            <Title disabled>Serviços</Title>

            {/* Exibe alerta de erro, se houver */}
            <AlertError appError={error} onClose={() => setError(null)} />

            {/* Barra de busca e botão para abrir modal de formulário de serviço */}
            <div className="grid grid-cols-3 items-start gap-x-4">
                <div className="col-span-2">
                    <FloatingLabel
                        variant="standard"
                        label="Buscar"
                        type="text"
                        value={searchText}
                        onChange={handleSearch}
                    />
                </div>

                <div className="flex justify-end">
                    <Button onClick={() => setIsModalOpen(true)}>Novo</Button>
                    <ServiceFormModal
                        isOpen={isModalOpen}
                        onClose={onCloseModal}
                        onSave={handleSave}
                        editMode={!!selectedService}
                        service={selectedService}
                    />
                </div>
            </div>

            {/* Tabela de serviços */}
            <GenericTable
                data={data}
                columns={columns}
                keyExtractor={(data: Service) => data.id}
            />

            {/* Controles de paginação */}
            <PaginationControls
                currentPage={currentPage}
                totalRecords={count}
                onPageChange={onPageChange}
            />
        </Container>
    );
}

export default Services;
