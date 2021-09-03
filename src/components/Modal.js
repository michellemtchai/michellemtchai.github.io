import React, { useState, useEffect } from 'react';

const Modal = ({ show, updateShow, children }) => {
    const [showModal, setShowModal] = useState(show);
    const closeModal = () => {
        setShowModal(false);
        updateShow(false);
    };
    useEffect(() => {
        setShowModal(show);
    }, [show]);
    return (
        showModal && (
            <div>
                <div
                    className="overlay"
                    role="button"
                    tabIndex={0}
                    onClick={closeModal}
                />
                <div className="modal-content">{children}</div>
            </div>
        )
    );
};

export default Modal;
