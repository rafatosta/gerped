import { Badge, Button, Dropdown, FloatingLabel, Label, Tabs, TextInput } from 'flowbite-react'
import { FormEvent, useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import Title from '@renderer/components/Title'
import InputMask from 'react-input-mask'
import Client from '@backend/models/Client'
import { useClient } from '@renderer/hooks/useClient'
import Container from '@renderer/components/Container'
import GenericTable from '@renderer/components/GenericTable'
import Order from '@backend/models/Order'
import { OrderStatus } from '@backend/enums/OrderStatus'
import formatDate from '@renderer/utils/formatDate'
import { useOrder } from '@renderer/hooks/useOrder'
import PaginationControls from '@renderer/components/PaginationControls'


function ClienteDetails() {
  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchText, setSearchText] = useState<string>('')
  const [filterStatus, setFilterStatus] = useState<OrderStatus>(OrderStatus.ATIVO);

  const [buttonUpEnable, setButtonUpEnable] = useState(true)
  const [client, setClient] = useState<Client>({
    name: '',
    phone: '',
    email: '',
    course: '',
    institute: ''
  } as Client)

  const { save, findById, remove } = useClient()
  const { dataOrdersByClient, countOrdersByClient, findOrdersByClientId } = useOrder()

  const onPageChange = (page: number) => setCurrentPage(page)
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(event.target.value)

  useEffect(() => {
    if (id) {
      findById(id)
        .then(data => {
          setClient(data)
        })
    }
  }, [id])

  useEffect(() => {
    if (id) {
      findOrdersByClientId(id, searchText, currentPage, filterStatus)
    }
  }, [currentPage, searchText, filterStatus])

  const handleInputChange = (field: keyof Client) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (field === 'phone') {
      const value = e.target.value.replace(/\D/g, '') // Remove caracteres não numéricos
      setClient({ ...client, [field]: value } as Client)
    } else {
      setClient({ ...client, [field]: e.target.value } as Client)
    }
    setButtonUpEnable(false)
  }

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        await save(client)
        setButtonUpEnable(true)
      } catch (error) {
        console.error('Error saving Cliente:', error)
      }
    },
    [client, save]
  )

  const handleDelete = useCallback(async () => {
    if (client.id) {
      await remove(client.id)
      navigate('/clients')
    } else {
      console.error('ID is undefined')
    }
  }, [client.id, remove, navigate])

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
          {OrderStatus[data.status]}
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
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
              label="Email (Opicional)"
              type="email"
              value={client.email}
              onChange={handleInputChange('email')}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FloatingLabel
            variant="filled"
            label="Curso (Opicional)"
            type="text"
            value={client.course}
            onChange={handleInputChange('course')}
          />
          <FloatingLabel
            variant="filled"
            label="Instituto (Opicional)"
            type="text"
            value={client.institute}
            onChange={handleInputChange('institute')}
          />
        </div>
        <div className="flex justify-between items-center py-4">
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
        <div >
          <FloatingLabel
            variant="standard"
            label="Buscar"
            type="text"
            value={searchText}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-x-4">
          <p>Filtrar por:</p>
          <Dropdown color="gray" label={filterStatus ? OrderStatus[filterStatus] : "TODOS"}>
            <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.ATIVO)}>ATIVO</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.FINALIZADO)}>FINALIZADO</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterStatus(OrderStatus.TODOS)}>TODOS</Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => navigate(`/orders/create/${client.id}`)}>Novo</Button>
        </div>
      </div>
      <GenericTable data={dataOrdersByClient} columns={columns} keyExtractor={(data: Order) => data.id} />
      <PaginationControls
        currentPage={currentPage}
        totalRecords={countOrdersByClient}
        onPageChange={onPageChange}
      />
    </Container>
  )
}

export default ClienteDetails
