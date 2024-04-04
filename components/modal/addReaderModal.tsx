import React from 'react';
import Modal from '@/components/modal/modal';
import Style from '@/app/index.module.css';
import StyleModal from '@/app/modal.module.css';

interface ReaderData {
    number: string;
    id: string;
}

interface AddReaderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (readerData: ReaderData) => void;
    mode: 'add' | 'edit';
    readerData?: ReaderData[];
}

const AddReaderModal: React.FC<AddReaderModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    mode,
    readerData,
}) => {
    const handleConfirm = () => {
        const newReaderData: ReaderData = {
            number: (document.getElementById('readerNumber') as HTMLInputElement).value,
            id: (document.getElementById('readerID') as HTMLInputElement).value
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
                        <input
                            type="text"
                            id="readerNumber"
                            defaultValue={mode === 'edit' && readerData? readerData.reader_no : ''}
                            readOnly={mode === 'edit'}
                        />
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
