import Client from '@backend/models/Client'
import { Button, FloatingLabel, Modal } from 'flowbite-react'
import { FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'
import ClientIPC from '@renderer/ipc/ClientIPC'
import { IAppError } from '@backend/interface/IAppError'

interface IClienteFormDialog {
  onSave: () => void
  setError: any
}

function ClientFormModal({ onSave, setError }: IClienteFormDialog) {
  const [openModal, setOpenModal] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const [client, setClient] = useState<Client>({
    name: '',
    phone: '',
    email: '',
    course: '',
    institute: ''
  } as Client)

  const navigate = useNavigate()

  const handleInputChange = (field: keyof Client) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (field === 'phone') {
      const value = e.target.value.replace(/\D/g, '') // Remove caracteres não numéricos
      setClient({ ...client, [field]: value } as Client)
    } else {
      setClient({ ...client, [field]: e.target.value } as Client)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement
    const buttonName = submitter.name

    ClientIPC.save(client)
      .then((newClient) => {

        if (buttonName === 'btnCreateOrder') {
          navigate(`/orders/create/${newClient.id}`);
        } else {
          onSave()
        }
      }).catch((err: IAppError) => {
        setError(err)
      })

    onCloseModal()
  }

  const onCloseModal = () => {
    setOpenModal(false)
    setClient({
      name: '',
      phone: '',
      course: '',
      institute: ''
    } as Client)
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Novo</Button>
      <Modal show={openModal} onClose={onCloseModal} initialFocus={nameInputRef}>
        <Modal.Header>Novo Cliente</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FloatingLabel
              variant="filled"
              label="Nome"
              type="text"
              value={client.name}
              onChange={handleInputChange('name')}
              ref={nameInputRef}
              required
            />

            <div className="grid grid-cols-3 gap-4">
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

            <Modal.Footer className="flex flex-row justify-between items-center">
              <Button color="red" onClick={onCloseModal}>
                Cancelar
              </Button>
              <div className="flex gap-x-6">
                <Button name="saveClient" color="green" type="submit">
                  Finalizar
                </Button>
                <Button name="btnCreateOrder" type="submit">
                  Salvar e criar pedido
                </Button>
              </div>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ClientFormModal
