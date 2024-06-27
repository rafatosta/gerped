import Client from '@backend/models/Client'
import { Button, FloatingLabel, Modal } from 'flowbite-react'
import { FormEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'
import ClientIPC from '@renderer/ipc/ClientIPC'
import { IAppError } from '@backend/interface/IAppError'

// Interface para as props do componente ClientFormModal
interface IClienteFormDialog {
  onSave: () => void; // Função a ser chamada ao salvar o cliente
  setError: any; // Função para definir erros
}

function ClientFormModal({ onSave, setError }: IClienteFormDialog) {
  const [openModal, setOpenModal] = useState(false); // Estado para controlar a abertura do modal
  const nameInputRef = useRef<HTMLInputElement>(null); // Referência para o input de nome

  // Estado para armazenar os dados do cliente
  const [client, setClient] = useState<Client>({
    name: '',
    phone: '',
    email: '',
    course: '',
    institute: ''
  } as Client);

  const navigate = useNavigate();

  // Função para lidar com a mudança de valores nos inputs
  const handleInputChange = (field: keyof Client) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (field === 'phone') {
      const value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
      setClient({ ...client, [field]: value } as Client);
    } else {
      setClient({ ...client, [field]: e.target.value } as Client);
    }
  }

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const buttonName = submitter.name;

    // Salva o cliente usando ClientIPC e lida com a resposta
    ClientIPC.save(client)
      .then((newClient) => {
        if (buttonName === 'btnCreateOrder') {
          navigate(`/orders/create/${newClient.id}`);
        } else {
          onSave();
        }
      }).catch((err: IAppError) => {
        setError(err);
      });

    onCloseModal();
  }

  // Função para fechar o modal e resetar o estado do cliente
  const onCloseModal = () => {
    setOpenModal(false);
    setClient({
      name: '',
      phone: '',
      email: '',
      course: '',
      institute: ''
    } as Client);
  }

  return (
    <>
      {/* Botão para abrir o modal */}
      <Button onClick={() => setOpenModal(true)}>Novo</Button>
      {/* Modal para adicionar ou editar cliente */}
      <Modal show={openModal} onClose={onCloseModal} initialFocus={nameInputRef}>
        <Modal.Header>Novo Cliente</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Input para o nome do cliente */}
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
              {/* Input para o telefone do cliente com máscara */}
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
                {/* Input para o email do cliente (opcional) */}
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

            {/* Input para o curso do cliente (opcional) */}
            <FloatingLabel
              variant="filled"
              label="Curso (Opcional)"
              type="text"
              value={client.course}
              onChange={handleInputChange('course')}
            />

            {/* Input para o instituto do cliente (opcional) */}
            <FloatingLabel
              variant="filled"
              label="Instituto (Opcional)"
              type="text"
              value={client.institute}
              onChange={handleInputChange('institute')}
            />

            {/* Footer do modal com botões de ação */}
            <Modal.Footer className="flex flex-row justify-between items-center">
              <Button color="red" onClick={onCloseModal}>
                Cancelar
              </Button>
              <div className="flex gap-x-6">
                {/* Botão para finalizar a criação/edição do cliente */}
                <Button name="saveClient" color="green" type="submit">
                  Finalizar
                </Button>
                {/* Botão para salvar o cliente e criar um pedido */}
                <Button name="btnCreateOrder" type="submit">
                  Salvar e criar pedido
                </Button>
              </div>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ClientFormModal;
