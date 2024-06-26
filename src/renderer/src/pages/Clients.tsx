import Client from '@backend/models/Client' // Importa o modelo de Cliente do backend
import ClientFormModal from '@renderer/components/ClientFormModal' // Importa o modal de formulário de Cliente
import Container from '@renderer/components/Container' // Importa o componente de Container
import GenericTable from '@renderer/components/GenericTable' // Importa o componente de tabela genérica
import PaginationControls from '@renderer/components/PaginationControls' // Importa os controles de paginação
import Title from '@renderer/components/Title' // Importa o componente de título
import { useClient } from '@renderer/hooks/useClient' // Importa o hook personalizado useClient para operações relacionadas a Clientes
import { formatPhoneNumber } from '@renderer/utils/formatPhoneNumber' // Importa a função utilitária para formatar números de telefone
import { FloatingLabel } from 'flowbite-react' // Importa o componente FloatingLabel do pacote flowbite-react
import { useState } from 'react' // Importa o hook useState do React
import { Link } from 'react-router-dom' // Importa o componente Link do React Router

function Clients() {
  const [currentPage, setCurrentPage] = useState<number>(1) // Estado para controlar a página atual da lista de Clientes
  const [searchText, setSearchText] = useState<string>('') // Estado para armazenar o texto de busca na lista de Clientes

  const { data, count, save } = useClient(searchText, currentPage) // Desestruturação do retorno do hook useClient para obter dados, contagem e função de salvamento

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
      {/* Título da página */}
      <Title disabled>Clientes</Title>

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
          <ClientFormModal saveCliente={save} />
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
