import Client from '@backend/models/Client'
import ClientFormModal from '@renderer/components/ClientFormModal'
import Container from '@renderer/components/Container'
import GenericTable from '@renderer/components/GenericTable'
import PaginationControls from '@renderer/components/PaginationControls'
import Title from '@renderer/components/Title'
import { useClient } from '@renderer/hooks/useClient'
import { formatPhoneNumber } from '@renderer/utils/formatPhoneNumber'
import { TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Clients() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchText, setSearchText] = useState<string>('')

  const { data, count, save } = useClient(searchText, currentPage)

  const onPageChange = (page: number) => setCurrentPage(page)
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value)

  const columns = [
    {
      header: 'Nome',
      accessor: (data: Client) => data.name,
      className: 'whitespace-nowrap font-medium text-gray-900'
    },
    {
      header: 'Telefone',
      accessor: (data: Client) => formatPhoneNumber(data.phone),
    },
    { header: 'Curso', accessor: (data: Client) => data.course },
    {
      header: 'Ações',
      accessor: (data: Client) => (
        <Link to={`/clients/${data.id}`} className="font-medium text-cyan-600 hover:underline">
          Visualizar
        </Link>
      )
    }
  ]

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
        <ClientFormModal saveCliente={save} />
      </div>
      <GenericTable data={data} columns={columns} keyExtractor={(data: Client) => data.id} />
      <PaginationControls
        currentPage={currentPage}
        totalRecords={count}
        onPageChange={onPageChange}
      />
    </Container>
  )
}

export default Clients
