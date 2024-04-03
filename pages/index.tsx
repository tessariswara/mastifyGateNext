import React, { useReducer, useState, useEffect } from 'react';
import NavbarTemplate from '@/components/navbarTemplate';
import Style from '../app/index.module.css';
import AddControllerModal from '../components/modal/addControllerModal';
import DetailControllerModal from '../components/modal/detailControllerModal';
import AddReaderModal from '../components/modal/addReaderModal';
import ConfirmModal from '../components/modal/confirmationModal';
import { fetchData } from '@/components/api/listDataApi';
// import { getToken } from '@/components/api/token'

const ActionType = {
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
    SET_SELECTED_INDEX: 'SET_SELECTED_INDEX',
};

const modalReducer = (state, action) => {
    switch (action.type) {
        case ActionType.OPEN_MODAL:
            return { ...state, [action.modalType]: true };
        case ActionType.CLOSE_MODAL:
            return { ...state, [action.modalType]: false };
        case ActionType.SET_SELECTED_INDEX:
            return { ...state, selectedIndex: action.selectedIndex };
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
        readerSelectedIndex: 0 
    });

    const [controllers, setControllers] = useState([]);
    // const token = getToken();

    // console.log("ini token : ", token);

    useEffect(() => {
        const fetchControllerData = async () => {
            const data = await fetchData();
            setControllers(data);
        };
        fetchControllerData();
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
    

    const controllerData = [
        {
            id: 'CT-001',
            type: 'Type A',
            name: 'Controller 1',
            manufacture: 'Manufacturer A',
            ip: '192.168.1.1'
        },
        {
            id: 'CT-002',
            type: 'Type B',
            name: 'Controller 2',
            manufacture: 'Manufacturer B',
            ip: '192.168.1.2'
        },
        {
            id: 'CT-003',
            type: 'Type C',
            name: 'Controller 3',
            manufacture: 'Manufacturer C',
            ip: '192.168.1.3'
        },
        {
            id: 'CT-004',
            type: 'Type D',
            name: 'Controller 4',
            manufacture: 'Manufacturer D',
            ip: '192.168.1.4'
        },
        {
            id: 'CT-005',
            type: 'Type E',
            name: 'Controller 5',
            manufacture: 'Manufacturer E',
            ip: '192.168.1.5'
        }
    ];

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
            {controllerData.map((controller, index) => (
                <div className={Style.listData} key={index}>
                    <p>{controller.name}</p>
                    <p>5</p>
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
                controllerData={controllerData}
                selectedIndex={modalState.selectedIndex}
                openEditReaderModal={openEditReaderModal} 
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
                controllerData={controllerData}
                selectedIndex={modalState.selectedIndex} 
            />
        </div>
    );
};

export default NavbarTemplate(HomePage);
