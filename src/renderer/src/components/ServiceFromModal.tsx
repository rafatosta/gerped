import Service from "@backend/models/Service";
import { Button, FloatingLabel, Modal } from "flowbite-react";
import { FormEvent, useRef, useState, useEffect } from "react";

interface IServiceFormModal {
    isOpen: boolean;
    editMode: boolean;
    onClose: () => void;
    onSave: (data: Service) => Promise<Service>;
    service?: Service | null;
}

function ServiceFormModal({ isOpen, editMode, onClose, onSave, service }: IServiceFormModal) {
    const [data, setData] = useState<Service>({ description: '' } as Service);

    const descriptionInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (service) {
            setData(service);
        } else {
            setData({description: '' } as Service);
        }
    }, [service]);

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

    const handleCloseModal = () => {
        onClose();
        setData({ description: '' } as Service);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSave(data);
        handleCloseModal();
    };

    const handleInputChange = (field: keyof Service) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [field]: e.target.value } as Service);
    };

    return (
        <Modal show={isOpen} onClose={handleCloseModal} initialFocus={descriptionInputRef}>
            <Modal.Header>{editMode ? 'Editar Serviço' : 'Novo Serviço'}</Modal.Header>
            <Modal.Body>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <FloatingLabel
                        variant="filled"
                        label="Descrição"
                        type="text"
                        value={data.description}
                        onChange={handleInputChange('description')}
                        required
                        ref={descriptionInputRef}
                    />

                    <div className="flex flex-row justify-between items-center">
                        <Button color="red" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
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
