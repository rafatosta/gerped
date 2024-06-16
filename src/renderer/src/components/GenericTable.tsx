import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

interface Column<T> {
    header: string;
    accessor: (item: T) => React.ReactNode;
    className?: string
}

interface GenericTableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (item: T) => React.Key;
}

function GenericTable<T>({ data, columns, keyExtractor }: GenericTableProps<T>) {
    return (
        <div className="overflow-y-auto shadow-sm">
            <Table hoverable>
                <Table.Head className="sticky top-0">
                    {columns.map((column, index) => (
                        <Table.HeadCell key={index}>{column.header}</Table.HeadCell>
                    ))}
                    <Table.HeadCell>
                        <span className="sr-only">Visualizar</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y overflow-y-auto">
                    {data.map((item) => (
                        <Table.Row key={keyExtractor(item)} className="bg-white">
                            {columns.map((column, index) => (
                                <Table.Cell key={index} className={column.className}>
                                    {column.accessor(item)}
                                </Table.Cell>
                            ))}
                            <Table.Cell>
                                <Link
                                    to={`/cliente/${keyExtractor(item)}`}
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

export default GenericTable;
