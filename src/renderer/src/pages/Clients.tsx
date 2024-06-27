import { FloatingLabel } from 'flowbite-react'
import { useEffect, useState } from 'react'
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

function Clients() {
  // Estado para controlar a página atual da lista de Clientes
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Estado para armazenar o texto de busca na lista de Clientes
  const [searchText, setSearchText] = useState<string>('')

  // Estado para armazenar a lista de Clientes e total de registros
  const [data, setData] = useState<Client[]>([])
  const [count, setCount] = useState<number>(0)

  // Estado para armazenar erros
  const [error, setError] = useState<IAppError | null>(null)

  // Carregar a lista de clientes do banco de dados
  const fetchData = async () => {
    try {
      const res = await ClientIPC.findAll(searchText, currentPage)
      setData(res.data)
      setCount(res.count)
      setError(null)
    } catch (err) {
      setError(err as IAppError)
    }
  }

  useEffect(() => {
    fetchData()
  }, [searchText, currentPage])

  // Função para recarregar a lista de clientes após adição de um novo cliente
  const onSaveClient = () => {
    setSearchText('')
    setCurrentPage(1)
    fetchData()
  }

  // Função para atualizar a página atual da lista de Clientes
  const onPageChange = (page: number) => setCurrentPage(page)

  // Função para atualizar o texto de busca na lista de Clientes
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value)

  // Definição das colunas da tabela de Clientes
  const columns = [
    {
      header: 'Nome',
      accessor: (data: Client) => data.name, // Acessa o nome do Cliente
      className: 'whitespace-nowrap font-medium text-gray-900'
    },
    {
      header: 'Telefone',
      accessor: (data: Client) => formatPhoneNumber(data.phone)
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
      {/* Título da página */}
      <Title disabled>Clientes</Title>

      {/* Exibe alerta de erro, se houver */}
      <AlertError appError={error} onClose={() => setError(null)} />

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
          <ClientFormModal onSave={onSaveClient} setError={setError} />
        </div>
      </div>

      {/* Tabela de Clientes com dados e colunas definidas */}
      <GenericTable data={data} columns={columns} keyExtractor={(data: Client) => data.id} />

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
