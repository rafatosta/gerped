import { Table } from 'flowbite-react'

interface Column<T> {
  header: string
  accessor: (item: T) => React.ReactNode
  className?: string
}

interface GenericTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyExtractor: (item: T) => React.Key
}

function GenericTable<T>({ data, columns, keyExtractor }: GenericTableProps<T>) {
  return (
    <div className="overflow-y-auto shadow-sm">
      <Table hoverable>
        <Table.Head className="sticky top-0 z-50">
          {columns.map((column, index) => (
            <Table.HeadCell key={index}>{column.header}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y overflow-y-auto">
          {data.map((item) => (
            <Table.Row key={keyExtractor(item)} className="bg-white">
              {columns.map((column, index) => (
                <Table.Cell key={index} className={column.className}>
                  {column.accessor(item)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default GenericTable
