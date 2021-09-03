import React, { useState } from 'react';
import Image from './Image';
import Modal from './Modal';
import ImageDialog from './ImageDialog';

const Gallery = ({ list }) => {
    const [state, setState] = useState({
        show: false,
        selected: 0,
    });
    const openModal = (index) => {
        setState({
            show: true,
            selected: index,
        });
    };
    const updateStateAttribute = (attribute) => (value) => {
        setState({
            ...state,
            [attribute]: value,
        });
    };
    return (
        <div>
            <Modal show={state.show} updateShow={updateStateAttribute('show')}>
                <ImageDialog
                    list={list}
                    selected={state.selected}
                    updateSelected={updateStateAttribute('selected')}
                />
            </Modal>
            <ul>
                {list.map((image, index) => (
                    <li
                        key={image.contentful_id}
                        onClick={() => openModal(index)}
                        role="button"
                    >
                        <Image src={image} alt={`Gallery Image ${index}`} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Gallery;
