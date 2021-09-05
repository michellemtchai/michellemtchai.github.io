import React, { useState } from 'react';
import Image from './Image';
import Modal from './Modal';
import ImageDialog from './ImageDialog';

const Gallery = ({ list }) => {
    const [state, setState] = useState({
        show: false,
        selected: 0,
    });
    const openModal = (index) => (event) => {
        event.preventDefault();
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

            {list ? (
                <ul>
                    {list.map((image, index) => (
                        <li key={image.contentful_id}>
                            <a
                                onClick={openModal(index)}
                                href={`#image-${index}`}
                            >
                                <Image
                                    src={image}
                                    alt={`Gallery Image ${index}`}
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No photos in gallery</p>
            )}
        </div>
    );
};

export default Gallery;