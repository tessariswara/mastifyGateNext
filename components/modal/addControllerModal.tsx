import React from 'react';
import Modal from '@/components/modal/modal';
import Style from '@/app/index.module.css';
import StyleModal from '@/app/modal.module.css';

interface ControllerDetail {
    sid: string;
    id: string;
    type: string;
    name: string;
    manufacture: string;
    ip: string;
}

interface AddControllerModalProps {
    isOpen: boolean;
    onClose: () => void;
    controllerDetail?: ControllerDetail[];
    mode: 'add' | 'edit';
    selectedIndex?: number;
    token: string;
}

const AddControllerModal: React.FC<AddControllerModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    mode,
    controllerDetail,
    selectedIndex,
    token
}) => {
    const handleConfirm = async () => {
        if (mode === 'add') {
            const newData = {
                device_controller_id: (document.getElementById('controllerID') as HTMLInputElement).value,
                device_controller_type: (document.getElementById('controllerType') as HTMLInputElement).value,
                name: (document.getElementById('controllerName') as HTMLInputElement).value,
                manufacture: (document.getElementById('controllerManufacture') as HTMLInputElement).value,
                ip_address: (document.getElementById('controllerIP') as HTMLInputElement).value
            };
            await fetch('http://178.128.107.238:8000/apiv1/control', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add controller');
                }
                return response.json();
            })
            .then(data => {
                onConfirm(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else if (mode === 'edit' && controllerDetail && selectedIndex !== undefined) {
            const editedData =  {     
                id: controllerDetail.sid,           
                device_controller_id: (document.getElementById('controllerID') as HTMLInputElement).value,
                device_controller_type: (document.getElementById('controllerType') as HTMLInputElement).value,
                name: (document.getElementById('controllerName') as HTMLInputElement).value,
                manufacture: (document.getElementById('controllerManufacture') as HTMLInputElement).value,
                ip_address: (document.getElementById('controllerIP') as HTMLInputElement).value
            }
            fetch(`http://178.128.107.238:8000/apiv1/control/${controllerDetail.sid}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update controller');
                }
                return response.json();
            })
            .then(data => {
                onConfirm(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
                            defaultValue={mode === 'edit' && controllerDetail ? controllerDetail.id : '' }
                        />
                    </div>
                    <div className={StyleModal.formModal}>
                        <label htmlFor="controllerType">Device Controller Type</label>
                        <input
                            type="text"
                            id="controllerType"
                            defaultValue={mode === 'edit' && controllerDetail ? controllerDetail.type : '' }
                        />
                    </div>
                    <div className={StyleModal.formModal}>
                        <label htmlFor="controllerName">Controller Name</label>
                        <input
                            type="text"
                            id="controllerName"
                            defaultValue={mode === 'edit' && controllerDetail ? controllerDetail.name : '' }
                        />
                    </div>
                    <div className={StyleModal.formModal}>
                        <label htmlFor="controllerManufacture">Manufacture</label>
                        <input
                            type="text"
                            id="controllerManufacture"
                            defaultValue={mode === 'edit' && controllerDetail ? controllerDetail.manufacture : '' }
                        />
                    </div>
                    <div className={StyleModal.formModal}>
                        <label htmlFor="controllerIP">IP Address</label>
                        <input
                            type="text"
                            id="controllerIP"
                            defaultValue={mode === 'edit' && controllerDetail ? controllerDetail.ip : ''}
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