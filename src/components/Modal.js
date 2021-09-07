import React, { useState, useEffect } from 'react';
import * as styles from './Modal.module.scss';

const Modal = ({ show, updateShow, children }) => {
    const [showModal, setShowModal] = useState(show);
    const closeModal = (event) => {
        event.preventDefault();
        setShowModal(false);
        updateShow(false);
    };
    useEffect(() => {
        setShowModal(show);
    }, [show]);
    return (
        showModal && (
            <div className={styles.modal}>
                <button
                    className={styles.overlay}
                    onClick={closeModal}
                    href="#"
                >
                    {' '}
                </button>
                <div className={styles.modalContent}>{children}</div>
            </div>
        )
    );
};

export default Modal;
