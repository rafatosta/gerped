import { FloatingLabel } from 'flowbite-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AlertError from '@renderer/components/AlertError'
import Client from '@backend/models/Client'
import ClientFormModal from '@renderer/components/ClientFormModal'
import Container from '@renderer/components/Container'
import GenericTable from '@renderer/components/GenericTable'
import PaginationControls from '@renderer/components/PaginationControls'
import Title from '@renderer/components/Title'
import ClientIPC from '@renderer/ipc/ClientIPC'
import { formatPhoneNumber } from '@renderer/utils/formatPhoneNumber'
import { IAppError } from '@backend/interface/IAppError'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function Clients() {
  const queryClient = useQueryClient()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchText, setSearchText] = useState<string>('')
  const [errorApp, setErrorApp] = useState<IAppError | null>(null)

  const { data, error } = useQuery<{ data: Client[]; count: number }>({
    queryKey: ['clients', searchText, currentPage],
    queryFn: async () => {
      return await ClientIPC.findAll(searchText, currentPage)
    }
  })

  const clients = data?.data || []
  const count = data?.count || 0

  const { mutateAsync: onSaveClient } = useMutation({
    mutationFn: async (client: Client): Promise<Client> => {
      return await ClientIPC.save(client)
    },
    onSuccess: () => {
      setSearchText('')
      setCurrentPage(1)
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
    onError: (err) => {
      setErrorApp(err)
    }
  })

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
      accessor: (data: Client) => formatPhoneNumber(data.phone)
    },
    { header: 'Curso', accessor: (data: Client) => data.course },
    {
      header: '',
      accessor: (data: Client) => (
        <Link to={`/clients/${data.id}`} className="font-medium text-cyan-600 hover:underline">
          Visualizar
        </Link>
      )
    }
  ]

  if (error) return <div>Error: {error.message}</div>

  return (
    <Container>
      {/* Título da página */}
      <Title disabled>Clientes</Title>

      {/* Exibe alerta de erro, se houver */}
      <AlertError appError={errorApp} onClose={() => setErrorApp(null)} />

      {/* Barra de busca e botão para abrir modal de formulário de Cliente */}
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
          {/* Modal de formulário para adicionar novo Cliente */}
          <ClientFormModal onSave={onSaveClient} /* setError={setError} */ />
        </div>
      </div>

      {/* Tabela de Clientes com dados e colunas definidas */}
      <GenericTable data={clients} columns={columns} keyExtractor={(data: Client) => data.id} />

      {/* Controles de paginação para navegar entre páginas de Clientes */}
      <PaginationControls
        currentPage={currentPage}
        totalRecords={count}
        onPageChange={onPageChange}
      />
    </Container>
  )
}

export default Clients
