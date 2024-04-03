import React from 'react';
import Modal from '@/components/modal/modal';
import Style from '@/app/index.module.css';
import StyleModal from '@/app/modal.module.css';

interface ControllerData {
    id: string;
    type: string;
    name: string;
    manufacture: string;
    ip: string;
}

interface AddControllerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (controllerData: ControllerData) => void;
    mode: 'add' | 'edit';
    controllerData?: ControllerData[];
    selectedIndex?: number;
}

const AddControllerModal: React.FC<AddControllerModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    mode,
    controllerData,
    selectedIndex
}) => {
    const handleConfirm = () => {
        if (mode === 'add') {
            const newData: ControllerData = {
                id: (document.getElementById('controllerID') as HTMLInputElement).value,
                type: (document.getElementById('controllerType') as HTMLInputElement).value,
                name: (document.getElementById('controllerName') as HTMLInputElement).value,
                manufacture: (document.getElementById('controllerManufacture') as HTMLInputElement).value,
                ip: (document.getElementById('controllerIP') as HTMLInputElement).value
            };
            onConfirm(newData);
        } else if (mode === 'edit' && controllerData && selectedIndex !== undefined) {
            const editedData: ControllerData = {
                id: (document.getElementById('controllerID') as HTMLInputElement).value,
                type: (document.getElementById('controllerType') as HTMLInputElement).value,
                name: (document.getElementById('controllerName') as HTMLInputElement).value,
                manufacture: (document.getElementById('controllerManufacture') as HTMLInputElement).value,
                ip: (document.getElementById('controllerIP') as HTMLInputElement).value
            };
            onConfirm(editedData);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={StyleModal.layoutModal}>
                <h2>{mode === 'add' ? 'Add Controller' : 'Edit Controller'}</h2>
                <div className={StyleModal.containerForm}>
                    <div className={StyleModal.formModal}>
                        <label htmlFor="controllerID">Device Controller ID</label>
                        <input
                            type="text"
                            id="controllerID"
                            defaultValue={mode === 'edit' && controllerData && selectedIndex !== undefined ? controllerData[selectedIndex].id : '' }
                        />
                    </div>
                    <div className={StyleModal.formModal}>
                        <label htmlFor="controllerType">Device Controller Type</label>
                        <input
                            type="text"
                            id="controllerType"
                            defaultValue={mode === 'edit' && controllerData && selectedIndex !== undefined ? controllerData[selectedIndex].type : '' }
                        />
                    </div>
                    <div className={StyleModal.formModal}>
                        <label htmlFor="controllerName">Controller Name</label>
                        <input
                            type="text"
                            id="controllerName"
                            defaultValue={mode === 'edit' && controllerData && selectedIndex !== undefined ? controllerData[selectedIndex].name : '' }
                        />
                    </div>
                    <div className={StyleModal.formModal}>
                        <label htmlFor="controllerManufacture">Manufacture</label>
                        <input
                            type="text"
                            id="controllerManufacture"
                            defaultValue={mode === 'edit' && controllerData && selectedIndex !== undefined ? controllerData[selectedIndex].manufacture : '' }
                        />
                    </div>
                    <div className={StyleModal.formModal}>
                        <label htmlFor="controllerIP">IP Address</label>
                        <input
                            type="text"
                            id="controllerIP"
                            defaultValue={mode === 'edit' && controllerData && selectedIndex !== undefined ? controllerData[selectedIndex].ip : '' }
                        />
                    </div>
                </div>
                <div className={Style.control}>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleConfirm}>{mode === 'add' ? 'Save' : 'Update'}</button>
                </div>
            </div>
        </Modal>
    );
};

export default AddControllerModal;