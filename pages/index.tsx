import React, { useReducer, useState, useEffect } from 'react';
import NavbarTemplate from '@/components/navbarTemplate';
import Style from '../app/index.module.css';
import AddControllerModal from '../components/modal/addControllerModal';
import DetailControllerModal from '../components/modal/detailControllerModal';
import AddReaderModal from '../components/modal/addReaderModal';
import ConfirmModal from '../components/modal/confirmationModal';
import { getToken } from '@/components/api/token'

const ActionType = {
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
    SET_SELECTED_INDEX: 'SET_SELECTED_INDEX',
    SET_CONTROLLER_DATA: 'SET_CONTROLLER_DATA',
    SET_READER_DATA: 'SET_READER_DATA'
};

const modalReducer = (state, action) => {
    switch (action.type) {
        case ActionType.OPEN_MODAL:
            return { ...state, [action.modalType]: true };
        case ActionType.CLOSE_MODAL:
            return { ...state, [action.modalType]: false };
        case ActionType.SET_SELECTED_INDEX:
            return { ...state, selectedIndex: action.selectedIndex };
        case ActionType.SET_CONTROLLER_DATA:
            return { ...state, controllerData: action.controllerData };
        case ActionType.SET_READER_DATA:
            return { ...state, dataReader: action.dataReader };
        default:
            return state;
    }
};

const HomePage: React.FC = () => {
    const [modalState, dispatch] = useReducer(modalReducer, {
        addControllerModal: false,
        detailControllerModal: false,
        addReaderModal: false,
        confirmModal: false,
        selectedIndex: 0,
        readerSelectedIndex: 0,
        controllerData: [], 
        dataReader: []
    });
    const token = getToken();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const bodyData = {
                    filter: {
                        set_device_id: false,
                        device_id: "",
                        set_device_type: false,
                        device_type: "",
                        set_name: false,
                        name: "",
                        set_manufacture: false,
                        manufacture: "",
                        set_ip_address: false,
                        ip_address: ""
                    },
                    limit: 10,
                    page: 1,
                    order: "created_at",
                    sort: "DESC"
                };

                const response = await fetch('http://178.128.107.238:8000/apiv1/control/allcontrollers', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                });
                const data = await response.json();
                const dataModified = data.data.map(item => ({
                    ...item,
                    sid: item.id,
                    id: item.device_controller_id,
                    type: item.device_controller_type,
                    name: item.name,
                    manufacture: item.manufacture,
                    ip: item.ip_address
                }));
                const dataReader = dataModified.map(item => ({
                    reader: item.reader.map(readerItem => ({
                        ...readerItem,
                    }))
                }));
                
                dispatch({ type: ActionType.SET_CONTROLLER_DATA, controllerData: dataModified });
                dispatch({ type: ActionType.SET_READER_DATA, dataReader: dataReader });
            } catch (error) {
                console.error('Error fetching controller data:', error);
            }
        };

        fetchApi();
    }, []);

    const openModal = (modalType) => {
        dispatch({ type: ActionType.OPEN_MODAL, modalType });
    };

    const closeModal = (modalType) => {
        dispatch({ type: ActionType.CLOSE_MODAL, modalType });
    };

    const setEditIndex = (index) => { 
        dispatch({ type: ActionType.SET_SELECTED_INDEX, selectedIndex: index });
    };

    const confirmationModal = (confirmed) => {
        if (confirmed === 'Yes') {
            closeModal('addControllerModal');
            closeModal('addReaderModal');
        }
        closeModal('confirmModal');
    };

    const [editedReader, setEditedReader] = useState(null);

    const openEditReaderModal = (index, reader) => {
        setEditedReader(reader);
        openModal('editReaderModal');
    };


    return (
        <div className={Style.container}>
            <input className={Style.containerSearch} type="text" placeholder='Search' />
            <div className={Style.containerBody}>
                <h1>Device Management</h1>
                <div className={Style.control}>
                    <button onClick={() => openModal('addControllerModal')}>Add Controller</button>
                    <button onClick={() => openModal('addReaderModal')}>Add Reader</button>
                </div>
            </div>
            <div className={Style.listHeader}>
                <h2>Controller</h2>
                <h2>Total Reader</h2>
                <h2>Action</h2>
            </div>
            {modalState.controllerData && modalState.controllerData.map((controller, index) => (
                <div className={Style.listData} key={index}>
                    <p>{controller.name}</p>
                    <p>{controller.reader.length}</p>
                    <div className={Style.listAct}>
                        <div className={Style.listAction}>
                            <a onClick={() => {
                                setEditIndex(index); 
                                openModal('detailControllerModal');
                            }}>
                                <img src="/images/Detail.png" alt="Detail" />
                            </a>
                            <a onClick={() => {
                                setEditIndex(index); 
                                openModal('editControllerModal');
                            }}>
                                <img src="/images/Edit.png" alt="Edit" />
                            </a>
                            <a onClick={() => openModal('addControllerModal')}>
                                <img src="/images/Delete.png" alt="Delete" />
                            </a>
                        </div>
                    </div>
                </div>
            ))}
            <DetailControllerModal
                isOpen={modalState.detailControllerModal}
                onClose={() => closeModal('detailControllerModal')}
                controllerData={modalState.controllerData}
                selectedIndex={modalState.selectedIndex}
                openEditReaderModal={openEditReaderModal} 
                readerData={modalState.dataReader} 
            />
            <AddReaderModal 
                isOpen={modalState.addReaderModal} 
                onClose={() => closeModal('addReaderModal')} 
                onConfirm={(readerData) => {
                    console.log('Add Reader Data:', readerData);
                    closeModal('addReaderModal');
                }} 
                mode={'add'}
            />
            <AddReaderModal 
                isOpen={modalState.editReaderModal} 
                onClose={() => closeModal('editReaderModal')} 
                onConfirm={(readerData) => {
                    console.log('Edit Reader Data:', readerData);
                    closeModal('editReaderModal');
                }} 
                mode={'edit'}
                readerData={editedReader}
                readerSelectedIndex={modalState.readerSelectedIndex} 
            />
            <ConfirmModal 
                isOpen={modalState.confirmModal} 
                onClose={() => closeModal('confirmModal')} 
                onConfirm={confirmationModal} 
            />
            <AddControllerModal
                isOpen={modalState.addControllerModal}
                onClose={() => closeModal('addControllerModal')}
                onConfirm={(controllerData) => {
                    console.log('Add Controller Data:', controllerData);
                    closeModal('addControllerModal');
                }}
                mode={'add'}
            />
            <AddControllerModal
                isOpen={modalState.editControllerModal}
                onClose={() => closeModal('editControllerModal')}
                onConfirm={(editedData) => {
                    console.log('Edit Controller Data:', editedData);
                    closeModal('editControllerModal');
                }}
                mode={'edit'}
                controllerData={modalState.controllerData}
                selectedIndex={modalState.selectedIndex} 
            />
        </div>
    );
};

export default NavbarTemplate(HomePage);
