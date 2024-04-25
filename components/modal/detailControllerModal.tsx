import React, {useEffect, useState} from 'react';
import { getToken } from "@/components/api/token"
import Modal from '@/components/modal/modal';
import Style from '@/app/index.module.css';
import StyleModal from '@/app/modal.module.css';
import AddReaderModal from './addReaderModal'; 


interface ControllerDetail {
    id: string;
    type: string;
    name: string;
    manufacture: string;
    ip: string;
    token: string;
}

interface DetailControllerModalProps {
    isOpen: boolean;
    onClose: () => void;
    controllerDetail?: ControllerDetail[];
    openEditReaderModal: (index: number, reader: ReaderData) => void; 
    readerData: ReaderData[];
    token: string;
}

const DetailControllerModal: React.FC<DetailControllerModalProps> = ({  
    isOpen,
    onClose,
    openEditReaderModal,
    readerData,
    controllerDetail,
    token
}) => {
    const deleteReader = async (index, reader) => {
        try {
            console.log("ini", reader)
            const readerId = reader.id; 
            const response = await fetch(`http://178.128.107.238:8000/apiv1/reader/${readerId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                console.log('Controller deleted successfully');
            } else {
                console.error('Failed to delete controller');
            }   
        } catch (error) {
            console.error('Error deleting controller:', error);
        }
    };
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
                                value={controllerDetail ? controllerDetail.id : '' }
                                readOnly />
                        </div>
                        <div className={StyleModal.detailInput}>
                            <label htmlFor="controllerType">Device Controller Type</label>
                            <input 
                                type="text" 
                                id="controllerType"
                                value={controllerDetail ? controllerDetail.type : '' }
                                readOnly />
                        </div>
                    </div>
                    <div className={StyleModal.formModal}>
                        <label htmlFor="controllerName">Controller Name</label>
                        <input
                            type="text"
                            id="controllerName"
                            value={controllerDetail ? controllerDetail.name : '' }
                            readOnly
                        />
                    </div>
                    <div className={StyleModal.formDetailModal}>
                        <div className={StyleModal.detailInput}>
                            <label htmlFor="controllerManufacture">Manufacture</label>
                            <input 
                                type="text" 
                                id="controllerManufacture"
                                value={controllerDetail ? controllerDetail.manufacture : '' }
                                readOnly />
                        </div>
                        <div className={StyleModal.detailInput}>
                            <label htmlFor="controllerIP">IP Address</label>
                            <input 
                                type="text" 
                                id="controllerIP" 
                                value={controllerDetail ? controllerDetail.ip : '' }
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
                            {Array.isArray(readerData.reader) && readerData?.reader.map((reader, index) => (
                            <div className={Style.listReaderData} key={index}>
                                <p>{reader.reader_no}</p>
                                <p>{reader.reader_id}</p>
                                <div className={Style.listReaderAct}>
                                    <div className={Style.listReaderAction}>
                                        <a onClick={() => {
                                            openEditReaderModal(index, reader); 
                                        }}>
                                            <img src="/images/Edit.png" alt="Deskripsi gambar" />
                                        </a>
                                        <a onClick={() => {
                                            deleteReader(index, reader);
                                        }}>
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
