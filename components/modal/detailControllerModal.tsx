import React from 'react';
import Modal from '@/components/modal/modal';
import Style from '@/app/index.module.css';
import StyleModal from '@/app/modal.module.css';
import AddReaderModal from './addReaderModal';

interface ControllerData {
    id: string;
    type: string;
    name: string;
    manufacture: string;
    ip: string;
}

interface DetailControllerModalProps {
    isOpen: boolean;
    onClose: () => void;
    controllerData?: ControllerData[];
    selectedIndex?: number;
    openEditReaderModal: (index: number, reader: ReaderData) => void; 
}

const DetailControllerModal: React.FC<DetailControllerModalProps> = ({  
    isOpen,
    onClose,
    controllerData,
    selectedIndex,
    openEditReaderModal,
}) => {

    const readerData = [
        { id: 'Reader-001', name: 'Reader 1' },
        { id: 'Reader-002', name: 'Reader 2' },
        { id: 'Reader-003', name: 'Reader 3' },
        { id: 'Reader-004', name: 'Reader 4' }
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={StyleModal.layoutModal}>
                <h2>Detail Controller</h2>
                <div className={StyleModal.containerForm}>
                    <div className={StyleModal.formDetailModal}>
                        <div className={StyleModal.detailInput}>
                            <label htmlFor="controllerID">Device Controller ID </label>
                            <input 
                                type="text" 
                                id="controllerID"
                                value={controllerData && selectedIndex !== undefined ? controllerData[selectedIndex].id : '' }
                                readOnly />
                        </div>
                        <div className={StyleModal.detailInput}>
                            <label htmlFor="controllerType">Device Controller Type</label>
                            <input 
                                type="text" 
                                id="controllerType"
                                value={controllerData && selectedIndex !== undefined ? controllerData[selectedIndex].type : '' }
                                readOnly />
                        </div>
                    </div>
                    <div className={StyleModal.formModal}>
                        <label htmlFor="controllerName">Controller Name</label>
                        <input
                            type="text"
                            id="controllerName"
                            value={controllerData && selectedIndex !== undefined ? controllerData[selectedIndex].name : '' }
                            readOnly
                        />
                    </div>
                    <div className={StyleModal.formDetailModal}>
                        <div className={StyleModal.detailInput}>
                            <label htmlFor="controllerManufacture">Manufacture</label>
                            <input 
                                type="text" 
                                id="controllerManufacture"
                                value={controllerData && selectedIndex !== undefined ? controllerData[selectedIndex].manufacture : '' }
                                readOnly />
                        </div>
                        <div className={StyleModal.detailInput}>
                            <label htmlFor="controllerIP">IP Address</label>
                            <input 
                                type="text" 
                                id="controllerIP" 
                                value={controllerData && selectedIndex !== undefined ? controllerData[selectedIndex].ip : '' }
                                readOnly/>
                        </div>
                    </div>
                    <div className={StyleModal.formReaderModal}>
                        <label>Reader</label>
                        <div className={Style.listContainer}>
                            <div className={Style.listReaderHeader}>
                                <div className={Style.listReader}>
                                    <div className={Style.listReaderHead1}>
                                        <h2>List Reader</h2>
                                    </div>
                                    <div className={Style.listReaderHead2}>
                                        <div className={Style.listJudul}>Reader Number</div>
                                        <div className={Style.listJudul}>Reader ID</div>
                                    </div>
                                </div>
                                <div className={Style.listActReader}>
                                    <h2>Action</h2>
                                </div>
                            </div>
                            {readerData && readerData.map((reader, index) => (
                                <div className={Style.listReaderData} key={index}>
                                    <p>{reader.id}</p>
                                    <p>{reader.name}</p>
                                    <div className={Style.listReaderAct}>
                                        <div className={Style.listReaderAction}>
                                            <a onClick={() => {
                                                openEditReaderModal(index, reader); 
                                            }}>
                                                <img src="/images/Edit.png" alt="Deskripsi gambar" />
                                            </a>
                                            <a>
                                                <img src="/images/Delete.png" alt="Deskripsi gambar" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={Style.control}>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </Modal>
    );
};

export default DetailControllerModal;
