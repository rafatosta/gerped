import Client from "@backend/models/Client";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

interface ClientsTableProps {
    clients: Client[];
}

function ClientsTable({ clients }: ClientsTableProps) {
    return (
        <div className="overflow-y-auto shadow-sm">
            <Table hoverable>
                <Table.Head className="sticky top-0">
                    <Table.HeadCell>Nome</Table.HeadCell>
                    <Table.HeadCell>Telefone</Table.HeadCell>
                    <Table.HeadCell>Curso</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Visualizar</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y overflow-y-auto">
                    {clients.map((client) => (
                        <Table.Row key={client.id} className="bg-white">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                {client.name}
                            </Table.Cell>
                            <Table.Cell>{client.phone}</Table.Cell>
                            <Table.Cell>{client.course}</Table.Cell>
                            <Table.Cell>
                                <Link
                                    to={`/client/${client.id}`}
                                    className="font-medium text-cyan-600 hover:underline"
                                >
                                    Visualizar
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default ClientsTable;
