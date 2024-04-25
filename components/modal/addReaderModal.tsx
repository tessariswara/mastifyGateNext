import { React, useState, useEffect } from 'react';
import Modal from '@/components/modal/modal';
import Style from '@/app/index.module.css';
import StyleModal from '@/app/modal.module.css';
import Select from 'react-select';

interface ControllerData {
    sid: string;
    id: string;
    type: string;
    name: string;
    manufacture: string;
    ip: string;
}

interface ReaderData {
    number: string;
    id: string;
}

interface AddReaderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (readerData: ReaderData) => void;
    mode: 'add' | 'edit';
    controllerData?: ControllerData[];
    readerData?: ReaderData[];
    token: string;
}

const AddReaderModal: React.FC<AddReaderModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    mode,
    controllerData,
    readerData,
    token,
}) => {
    const [controllerId, setControllerId] = useState('');
    const [controllerName, setControllerName] = useState('');
    let haha: number;

    useEffect(() => {
        if (controllerName && controllerData) {
            const index = controllerData.findIndex(controller => controller.name === controllerName);
            if (index !== -1) {
                const uhuy = controllerData[index].reader ? controllerData[index].reader.map(item => parseInt(item.reader_no)) : [];
                const maxNum = Math.max(...uhuy);
                const minNum = Math.min(...uhuy);
                const range = maxNum - minNum + 1;
                
                if (range === uhuy.length) {
                    haha = maxNum + 1;
                } else {
                    const allNumbers = Array.from({ length: range }, (_, i) => i + minNum);
                    const missingNumber = allNumbers.find(num => !uhuy.includes(num));
                    haha = missingNumber || 1;
                }
                
                console.log(haha);
            }
        }
    }, [controllerName, controllerData]);

    const handleConfirm = () => {
        let newReaderData: ReaderData;
        if (mode === 'edit') {
            newReaderData = {
                reader_no: (document.getElementById('readerNumber') as HTMLInputElement).value,
                reader_id: (document.getElementById('readerID') as HTMLInputElement).value,
            };
            fetch(`http://178.128.107.238:8000/apiv1/reader/${readerData.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newReaderData)
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
        } else {
            newReaderData = {
                reader_id: (document.getElementById('readerID') as HTMLInputElement).value,
                reader_no: `${haha}`,
                device_controller_id: controllerId
            };
            fetch('http://178.128.107.238:8000/apiv1/reader', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newReaderData)
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
        };
    
        onConfirm(newReaderData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={StyleModal.layoutModal}>
                <h2>{mode === 'add' ? 'Add Reader' : 'Edit Reader'}</h2>
                <div className={StyleModal.containerForm}>
                    <div className={StyleModal.formModal}>
                        <label htmlFor="readerNumber">Reader Number</label>
                        {mode === 'edit' ? (
                            <input
                                    type="text"
                                    id="readerNumber"
                                    defaultValue={readerData ? readerData.reader_no : ''}
                                    readOnly={mode === 'edit'}
                            />
                        ) : (
                            <Select
                                id="selectDeviceControllerID"
                                placeholder="Select Device Controller ID..."
                                value={controllerName !== '' ? { value: controllerId, label: controllerName } : null} 
                                onChange={(select) => {
                                    setControllerId(select?.value)
                                    setControllerName(select?.label)
                                }
                                } 
                                options={controllerData && controllerData.length > 0 ? controllerData.map(controller => ({ value: controller.sid, label: controller.name })) : []} 
                            />
                        )}
                    </div>
                    <div className={StyleModal.formModal}>
                        <label htmlFor="readerID">Reader ID</label>
                        <input
                            type="text"
                            id="readerID"
                            defaultValue={mode === 'edit' && readerData? readerData.reader_id : ''}
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

export default AddReaderModal;