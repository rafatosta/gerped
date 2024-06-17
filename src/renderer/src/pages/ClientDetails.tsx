import { Button, FloatingLabel, Label, Tabs, TextInput } from 'flowbite-react'
import { FormEvent, useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Title from '@renderer/components/Title'
import InputMask from 'react-input-mask'
import Client from '@backend/models/Client'
import { useClient } from '@renderer/hooks/useClient'
import Container from '@renderer/components/Container'

function ClienteDetails() {
  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()

  const [buttonUpEnable, setButtonUpEnable] = useState(true)
  const [client, setClient] = useState<Client>({
    name: '',
    phone: '',
    email: '',
    course: '',
    institute: ''
  } as Client)

  const { saveClient, findByIdClient, deleteClient } = useClient()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await findByIdClient(id)
          setClient(res)
        } catch (error) {
          console.error('Error fetching Cliente:', error)
        }
      } else {
        console.error('ID is undefined')
      }
    }
    fetchData()
  }, [id])

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
        await saveClient(client)
        setButtonUpEnable(true)
      } catch (error) {
        console.error('Error saving Cliente:', error)
      }
    },
    [client, saveClient]
  )

  const handleDelete = useCallback(async () => {
    if (client.id) {
      console.log('delete:', client.id, client)
      await deleteClient(client.id)
      navigate('/clients')
    } else {
      console.error('ID is undefined')
    }
  }, [client.id, deleteClient, navigate])

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
    </Container>
  )
}

export default ClienteDetails
