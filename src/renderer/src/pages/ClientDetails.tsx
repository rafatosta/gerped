import { Badge, Button, Dropdown, FloatingLabel } from 'flowbite-react'
import { FormEvent, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import Title from '@renderer/components/Title'
import InputMask from 'react-input-mask'
import Client from '@backend/models/Client'
import Container from '@renderer/components/Container'
import GenericTable from '@renderer/components/GenericTable'
import Order from '@backend/models/Order'
import { OrderStatus } from '@backend/enums/OrderStatus'
import formatDate from '@renderer/utils/formatDate'
import { useOrder } from '@renderer/hooks/useOrder'
import PaginationControls from '@renderer/components/PaginationControls'
import { IAppError } from '@backend/interface/IAppError'
import AlertError from '@renderer/components/AlertError'
import ClientIPC from '@renderer/ipc/ClientIPC'

function ClienteDetails() {
  const { id } = useParams<{ id: string }>() // Obtém o parâmetro de rota 'id'
  const navigate = useNavigate() // Hook de navegação do React Router

  const [error, setError] = useState<IAppError | null>(null) // Estado para armazenar erros

  const [currentPage, setCurrentPage] = useState<number>(1) // Estado para controlar a página atual dos pedidos
  const [searchText, setSearchText] = useState<string>('') // Estado para o texto de busca na lista de pedidos
  const [filterStatus, setFilterStatus] = useState<OrderStatus>(OrderStatus.ATIVO); // Estado para o status de filtro dos pedidos

  const [buttonUpEnable, setButtonUpEnable] = useState(true) // Estado para controlar o estado do botão 'Atualizar'
  const [client, setClient] = useState<Client>({ // Estado para armazenar informações do cliente
    name: '',
    phone: '',
    email: '',
    course: '',
    institute: ''
  } as Client)

  const { dataOrdersByClient, countOrdersByClient, findOrdersByClientId } = useOrder() // Utiliza o hook personalizado 'useOrder' para obter dados dos pedidos

  // Função para mudar a página atual dos pedidos
  const onPageChange = (page: number) => setCurrentPage(page)

  // Função para atualizar o texto de busca na lista de pedidos
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value)

  // Efeito para carregar dados do cliente baseado no 'id' da rota
  useEffect(() => {
    if (id) {
      ClientIPC.findById(id)
        .then(data => {
          setClient(data)
        })
    }
  }, [id])

  // Efeito para atualizar a lista de pedidos baseado em mudanças de página, texto de busca ou status de filtro
  useEffect(() => {
    if (id) {
      findOrdersByClientId(id, searchText, currentPage, filterStatus)
    }
  }, [currentPage, searchText, filterStatus])

  // Função para atualizar campos do formulário de cliente
  const handleInputChange = (field: keyof Client) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (field === 'phone') {
      const value = e.target.value.replace(/\D/g, '') // Remove caracteres não numéricos do campo de telefone
      setClient({ ...client, [field]: value } as Client)
    } else {
      setClient({ ...client, [field]: e.target.value } as Client)
    }
    setButtonUpEnable(false) // Habilita o botão 'Atualizar'
  }

  // Função assíncrona para lidar com o envio do formulário de cliente
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    ClientIPC.save(client).then(() => {
      setButtonUpEnable(true) // Após salvar, habilita o botão 'Atualizar'
    }).catch((err: IAppError) => {
      setError(err) // Em caso de erro, define o estado de erro
    })
  }


  // Função assíncrona para lidar com a exclusão do cliente
  const handleDelete = async () => {
    if (client.id) {
      ClientIPC.delete(client.id).then(() => {
        navigate('/clients') // Após excluir, navega para a lista de clientes
      }).catch((err: IAppError) => {
        setError(err) // Em caso de erro, define o estado de erro
      })
    }
  }


    // Configuração das colunas da tabela de pedidos
    const columns = [
      {
        header: 'Tema',
        accessor: (data: Order) => (
          <div>
            {data.theme}
            <p className="text-xs text-gray-500">{data.Service.description}</p>
          </div>
        ),
        className: 'whitespace-nowrap font-medium text-gray-900'
      },
      {
        header: 'Entrega',
        accessor: (data: Order) => formatDate(data.deliveryDate)
      },
      {
        header: 'Situação',
        accessor: (data: Order) => (
          <Badge color={data.status == OrderStatus.ATIVO ? "warning" : "success"} className="flex justify-center items-center">
            {OrderStatus[data.status]} {/* Exibe o status do pedido com base no enum OrderStatus */}
          </Badge>
        ),
      },
      {
        header: 'Ações',
        accessor: (data: Order) => (
          <Link to={`/orders/${data.id}`} className="font-medium text-cyan-600 hover:underline">
            Visualizar
          </Link>
        )
      }
    ];

    return (
      <Container>
        <div className="flex justify-between items-center gap-4">
          <Title>Detalhe do cliente</Title>
          <p className="text-gray-400 italic text-lg">#{client.id}</p>
        </div>

        {/* Exibe alerta de erro, se houver */}
        <AlertError appError={error} onClose={() => setError(null)} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          {/* Campos editáveis do formulário de cliente */}
          <FloatingLabel
            variant="filled"
            label="Nome"
            type="text"
            value={client.name}
            onChange={handleInputChange('name')}
            required
          />
          <div className="grid grid-cols-3 gap-2">
            <InputMask
              mask="(99) 99999-9999"
              value={client.phone}
              onChange={handleInputChange('phone')}
            >
              {(inputProps: any) => (
                <FloatingLabel
                  variant="filled"
                  {...inputProps}
                  label="Telefone"
                  value={client.phone}
                  required
                />
              )}
            </InputMask>
            <div className="col-span-2">
              <FloatingLabel
                variant="filled"
                className="col-span-2"
                label="Email (Opcional)"
                type="email"
                value={client.email}
                onChange={handleInputChange('email')}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FloatingLabel
              variant="filled"
              label="Curso (Opcional)"
              type="text"
              value={client.course}
              onChange={handleInputChange('course')}
            />
            <FloatingLabel
              variant="filled"
              label="Instituto (Opcional)"
              type="text"
              value={client.institute}
              onChange={handleInputChange('institute')}
            />
          </div>
          <div className="flex justify-between items-center py-4">
            {/* Botões para excluir e atualizar o cliente */}
            <Button color="red" onClick={handleDelete}>
              Excluir
            </Button>
            <Button type="submit" disabled={buttonUpEnable}>
              Atualizar
            </Button>
          </div>
        </form>
        <Title disabled>Lista de Pedidos</Title>
        <div className="grid grid-cols-3 items-start gap-x-4">
          <div>
            {/* Campo de busca na lista de pedidos */}
            <FloatingLabel
              variant="standard"
              label="Buscar"
              type="text"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center gap-x-4 z-50">
            <p>Filtrar por:</p>
            {/* Dropdown para filtrar por status de pedido */}
            <Dropdown color="gray" label={filterStatus ? OrderStatus[filterStatus] : "TODOS"}>
              <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.ATIVO)}>ATIVO</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.FINALIZADO)}>FINALIZADO</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.TODOS)}>TODOS</Dropdown.Item>
            </Dropdown>
          </div>
          <div className="flex justify-end">
            {/* Botão para adicionar novo pedido */}
            <Button onClick={() => navigate(`/orders/create/${client.id}`)}>Novo</Button>
          </div>
        </div>
        {/* Tabela de pedidos */}
        <GenericTable data={dataOrdersByClient} columns={columns} keyExtractor={(data: Order) => data.id} />
        {/* Controla a paginação da tabela de pedidos */}
        <PaginationControls
          currentPage={currentPage}
          totalRecords={countOrdersByClient}
          onPageChange={onPageChange}
        />
      </Container>
    )
  }

  export default ClienteDetails
