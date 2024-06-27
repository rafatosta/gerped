import Service from "@backend/models/Service";
import { Button, FloatingLabel, Modal } from "flowbite-react";
import { FormEvent, useRef, useState, useEffect } from "react";

// Interface para as props do componente ServiceFormModal
interface IServiceFormModal {
    isOpen: boolean; // Indica se o modal está aberto
    editMode: boolean; // Indica se o modal está no modo de edição
    onClose: () => void; // Função para fechar o modal
    onSave: (data: Service) => void; // Função para salvar os dados do serviço
    service?: Service | null; // Dados do serviço a ser editado, opcional
}

function ServiceFormModal({ isOpen, editMode, onClose, onSave, service }: IServiceFormModal) {
    const [data, setData] = useState<Service>({ description: '' } as Service); // Estado para armazenar os dados do serviço

    const descriptionInputRef = useRef<HTMLInputElement>(null); // Referência para o input de descrição

    // Efeito para atualizar os dados quando o serviço muda
    useEffect(() => {
        if (service) {
            setData(service);
        } else {
            setData({ description: '' } as Service);
        }
    }, [service]);

    // Efeito para lidar com a tecla Esc para fechar o modal
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        } else {
            document.removeEventListener('keydown', handleEsc);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen]);

    // Função para fechar o modal e resetar os dados
    const handleCloseModal = () => {
        onClose();
        setData({ description: '' } as Service);
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSave(data);
        handleCloseModal();
    };

    // Função para lidar com a mudança de input de descrição
    const handleInputChange = (field: keyof Service) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [field]: e.target.value } as Service);
    };

    return (
        <Modal show={isOpen} onClose={handleCloseModal} initialFocus={descriptionInputRef}>
            <Modal.Header>{editMode ? 'Editar Serviço' : 'Novo Serviço'}</Modal.Header>
            <Modal.Body>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Input para descrição do serviço */}
                    <FloatingLabel
                        variant="filled"
                        label="Descrição"
                        type="text"
                        value={data.description}
                        onChange={handleInputChange('description')}
                        required
                        ref={descriptionInputRef}
                    />

                    {/* Rodapé do modal com botões de ação */}
                    <div className="flex flex-row justify-between items-center">
                        {/* Botão de cancelar */}
                        <Button color="red" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                        {/* Botão de salvar */}
                        <Button type="submit">
                            Salvar
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ServiceFormModal;
