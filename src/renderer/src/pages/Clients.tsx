import Client from "@backend/models/Client";
import ClientFormModal from "@renderer/components/ClientFormModal";
import Container from "@renderer/components/Container";
import GenericTable from "@renderer/components/GenericTable";
import PaginationControls from "@renderer/components/PaginationControls";
import Title from "@renderer/components/Title";
import { useClient } from "@renderer/hooks/useClient";
import { formatPhoneNumber } from "@renderer/utils/formatPhoneNumber";
import { TextInput } from "flowbite-react";
import { useState } from "react";

function Clients() {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchText, setSearchText] = useState<string>('');

    const { clients, totalRecords, saveClient } = useClient(searchText, currentPage);

    const onPageChange = (page: number) => setCurrentPage(page);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

    const columns = [
        { header: "Nome", accessor: (client: Client) => client.name, className: 'whitespace-nowrap font-medium text-gray-900' },
        { header: "Telefone", accessor: (client: Client) => formatPhoneNumber(client.phone) },
        { header: "Curso", accessor: (client: Client) => client.course },
    ];

    return (
        <Container>
            <Title disabled>Clientes</Title>

            <div className="flex justify-between items-center">
                <TextInput

                    placeholder="Buscar..."
                    className="w-1/2"
                    value={searchText}
                    onChange={handleSearch}
                />
                <ClientFormModal saveCliente={saveClient} />
            </div>
            {/* <ClientsTable clients={clients} /> */}
            <GenericTable
                data={clients}
                columns={columns}
                keyExtractor={(client: Client) => client.id}
            />
            <PaginationControls
                currentPage={currentPage}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
            />

        </Container>);
}

export default Clients;