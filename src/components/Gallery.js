import React, { useState } from 'react';
import Image from './Image';
import Modal from './Modal';
import ImageDialog from './ImageDialog';
import * as styles from './Gallery.module.scss';

const Gallery = ({ list }) => {
    const [state, setState] = useState({
        show: true,
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
        <div className={styles.gallery}>
            <Modal show={state.show} updateShow={updateStateAttribute('show')}>
                <ImageDialog
                    list={list}
                    selected={state.selected}
                    updateSelected={updateStateAttribute('selected')}
                />
            </Modal>
            {list ? (
                <ul className={styles.list}>
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
                <p className={styles.noPhoto}>No photos in gallery</p>
            )}
        </div>
    );
};

export default Gallery;
