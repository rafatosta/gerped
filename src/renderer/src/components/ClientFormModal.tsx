import Client from "@backend/models/Client";
import { Button, FloatingLabel, Modal } from "flowbite-react";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from 'react-input-mask'

interface IClienteFormDialog {
    saveCliente: (cliente: Client) => Promise<Client>
}

function ClientFormModal({ saveCliente }: IClienteFormDialog) {
    const [openModal, setOpenModal] = useState(false);
    const nameInputRef = useRef<HTMLInputElement>(null);

    const [client, setClient] = useState<Client>({} as Client)

    const navigate = useNavigate();

    const handleInputChange = (field: keyof Client) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (field === 'phone') {
            const value = e.target.value.replace(/\D/g, '') // Remove caracteres não numéricos
            setClient({ ...client, [field]: value } as Client)
        } else {
            setClient({ ...client, [field]: e.target.value } as Client)
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
        const buttonName = submitter.name;

        try {
            const novoCliente = await saveCliente(client);

            if (buttonName === 'newOrder') {
                console.log('new ID:', novoCliente.id);
                //navigate(`/pedido/cliente/${novoCliente.id}`);
            }

            onCloseModal()
        } catch (error) {
            alert(`Erro ao salvar cliente:${error}`);
        }
    }

    const onCloseModal = () => {
        setOpenModal(false)
        setClient({} as Client)
    }

    return (
        <>
            <Button onClick={() => setOpenModal(true)}>Novo</Button>
            <Modal show={openModal} onClose={onCloseModal} initialFocus={nameInputRef}>
                <Modal.Header>Novo Cliente</Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <FloatingLabel variant="filled"
                            label="Nome"
                            type="text"
                            value={client.name}
                            onChange={handleInputChange('name')}
                            ref={nameInputRef}
                            required />

                        <InputMask
                            mask="(99) 99999-9999"
                            value={client.phone}
                            onChange={handleInputChange('phone')}
                        >
                            {(inputProps: any) => (
                                <FloatingLabel variant="filled"
                                    {...inputProps}
                                    label="Telefone"
                                    value={client.phone}
                                    required />
                            )}
                        </InputMask>

                        <FloatingLabel variant="filled"
                            label="Curso"
                            type="text"
                            value={client.course}
                            onChange={handleInputChange('course')}
                            required />

                        <FloatingLabel variant="filled"
                            label="Instituto"
                            type="text"
                            value={client.institute}
                            onChange={handleInputChange('institute')}
                            required />

                        <Modal.Footer className="flex flex-row justify-between items-center">
                            <Button
                                color="red"
                                onClick={onCloseModal}
                            >
                                Cancelar
                            </Button>
                            <div className="flex gap-x-6">
                                <Button name="saveClient" color="green" type="submit">
                                    Finalizar
                                </Button>
                                <Button name="newOrder" type="submit">
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

