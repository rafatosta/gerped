import Service from "@backend/models/Service";
import Container from "@renderer/components/Container";
import GenericTable from "@renderer/components/GenericTable";
import PaginationControls from "@renderer/components/PaginationControls";
import ServiceFormModal from "@renderer/components/ServiceFromModal";

import Title from "@renderer/components/Title";
import { useService } from "@renderer/hooks/useService";
import { Button, FloatingLabel } from "flowbite-react";
import { useState } from "react";

function Services() {
    const [searchText, setSearchText] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { data, count, save, remove } = useService(searchText, currentPage);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onPageChange = (page: number) => setCurrentPage(page);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleEdit = async (data: Service) => {
        setSelectedService(data);
        setIsModalOpen(true);
    };

    const handleDelete = async (data: Service) => {
        await remove(data.id);
    };

    const handleSave = async (service: Service): Promise<Service> => {
        setIsModalOpen(false);
        return await save(service);
    };

    const onCloseModal = () => {
        setIsModalOpen(false)
        setSelectedService(null)
    }

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
            <Title disabled>Serviços</Title>
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
            <GenericTable data={data} columns={columns} keyExtractor={(data: Service) => data.id} />
            <PaginationControls
                currentPage={currentPage}
                totalRecords={count}
                onPageChange={onPageChange}
            />
        </Container>
    );
}

export default Services;
