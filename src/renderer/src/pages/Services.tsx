import { IAppError } from '@backend/interface/IAppError'
import Service from '@backend/models/Service'
import AlertError from '@renderer/components/AlertError'
import Container from '@renderer/components/Container'
import GenericTable from '@renderer/components/GenericTable'
import PaginationControls from '@renderer/components/PaginationControls'
import ServiceFormModal from '@renderer/components/ServiceFromModal'
import Title from '@renderer/components/Title'
import ServiceIPC from '@renderer/ipc/ServiceIPC'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FloatingLabel, Button } from 'flowbite-react'
import { useState } from 'react'

function Services() {
  const queryClient = useQueryClient()

  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<IAppError | null>(null)

  const [searchText, setSearchText] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data } = useQuery<{ data: Service[]; count: number }>({
    queryKey: ['services', searchText, currentPage],
    queryFn: async () => {
      return await ServiceIPC.findAll(searchText, currentPage)
    }
  })

  const services = data?.data || []
  const count = data?.count || 0

  // Função para mudar a página atual
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Função para atualizar o texto de busca e resetar para a primeira página
  const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
    setCurrentPage(1) // Reset para a primeira página ao buscar
  }

  // Função para deletar um serviço
  const { mutateAsync: handleDelete } = useMutation({
    mutationFn: async (service: Service) => await ServiceIPC.delete(service.id),
    onSuccess: () => {
      setIsModalOpen(false)
      setSearchText('')
      setCurrentPage(1)
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
    onError: (err) => {
      setError(err as IAppError)
    }
  })

  // Função para salvar um serviço
  const { mutateAsync: handleSave } = useMutation({
    mutationFn: async (service: Service) => await ServiceIPC.save(service),
    onSuccess: () => {
      setIsModalOpen(false)
      setSearchText('')
      setCurrentPage(1)
      queryClient.invalidateQueries({ queryKey: ['services'] })
    },
    onError: (err) => {
      setError(err as IAppError)
    }
  })

  // Função para editar um serviço
  const openModalEdit = async (data: Service) => {
    setSelectedService(data)
    setIsModalOpen(true)
  }

  // Função para fechar o modal de formulário
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
  }

  // Definição das colunas da tabela de serviços
  const columns = [
    {
      header: 'Descrição',
      accessor: (data: Service) => data.description,
      className: 'whitespace-nowrap font-medium text-gray-900'
    },
    {
      header: '',
      accessor: (data: Service) => (
        <button
          className="font-medium text-green-600 hover:underline"
          onClick={() => openModalEdit(data)}
        >
          Editar
        </button>
      )
    },
    {
      header: '',
      accessor: (data: Service) => (
        <button
          className="font-medium text-red-600 hover:underline"
          onClick={() => handleDelete(data)}
        >
          Apagar
        </button>
      )
    }
  ]

  return (
    <Container>
      {/* Título da página */}
      <Title disabled>Serviços</Title>

      {/* Exibe alerta de erro, se houver */}
      <AlertError appError={error} onClose={() => setError(null)} />

      {/* Barra de busca e botão para abrir modal de formulário de serviço */}
      <div className="grid grid-cols-3 items-start gap-x-4">
        <div className="col-span-2">
          <FloatingLabel
            variant="standard"
            label="Buscar"
            type="text"
            value={searchText}
            onChange={handleSearchText}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={() => setIsModalOpen(true)}>Novo</Button>
          <ServiceFormModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={handleSave}
            editMode={!!selectedService}
            service={selectedService}
          />
        </div>
      </div>

      {/* Tabela de serviços */}
      <GenericTable data={services} columns={columns} keyExtractor={(data: Service) => data.id} />

      {/* Controles de paginação */}
      <PaginationControls
        currentPage={currentPage}
        totalRecords={count}
        onPageChange={onPageChange}
      />
    </Container>
  )
}

export default Services
