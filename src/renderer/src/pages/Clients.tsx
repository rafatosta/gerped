import ClientsTable from "@renderer/components/ClientsTable";
import Container from "@renderer/components/Container";
import PaginationControls from "@renderer/components/PaginationControls";
import Title from "@renderer/components/Title";
import { useClient } from "@renderer/hooks/useClient";
import { Button, TextInput } from "flowbite-react";
import { useState } from "react";

function Clients() {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchText, setSearchText] = useState<string>('');

    const { clients, totalRecords } = useClient(searchText, currentPage);

    const onPageChange = (page: number) => setCurrentPage(page);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);

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
                <Button>Novo</Button>
            </div>
            <ClientsTable clients={clients} />
            <PaginationControls
                currentPage={currentPage}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
            />

        </Container>);
}

export default Clients;