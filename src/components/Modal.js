import React, { useState, useEffect } from 'react';
import { useKeyPress } from '../hooks/keys';
import * as styles from './Modal.module.scss';

const Modal = ({ show, updateShow, children }) => {
    const [showModal, setShowModal] = useState(show);
    const closeModal = () => {
        setShowModal(false);
        updateShow(false);
    };
    useKeyPress('Escape', closeModal);
    useEffect(() => {
        setShowModal(show);
    }, [show]);
    return (
        showModal && (
            <div className={styles.modal}>
                <button className={styles.overlay} onClick={closeModal}>
                    {' '}
                </button>
                <div className={styles.modalContent}>{children}</div>
            </div>
        )
    );
};

export default Modal;
