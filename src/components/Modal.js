import React, { useState, useEffect } from 'react';

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
            <div>
                <button
                    className="overlay"
                    onClick={closeModal}
                    href="#"
                ></button>
                <div className="modal-content">{children}</div>
            </div>
        )
    );
};

export default Modal;
