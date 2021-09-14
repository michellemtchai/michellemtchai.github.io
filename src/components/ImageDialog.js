import React, { useState, useEffect } from 'react';
import { useKeyPress } from '../hooks/keys';
import Image from './Image';
import Button from './Button';
import * as styles from './ImageDialog.module.scss';

const ImageDialog = ({ list, selected, updateSelected }) => {
    const [selectedIndex, setSelectedIndex] = useState(selected);
    useKeyPress('ArrowLeft', () => changeImage(-1));
    useKeyPress('ArrowRight', () => changeImage(1));
    useEffect(() => {
        setSelectedIndex(selected);
    }, [selected]);
    const changeImage = (increment) => {
        const index = selectedIndex + increment;
        if (index >= 0 && index < list.length) {
            setSelectedIndex(index);
            updateSelected(index);
        }
    };
    const clickImage = () => {
        if (selected + 1 < list.length) {
            changeImage(1);
        } else {
            changeImage(-list.length + 1);
        }
    };
    let image = list[selectedIndex];
    return (
        <>
            <Button
                className={styles.leftButton}
                onClick={() => changeImage(-1)}
                disabled={selectedIndex - 1 < 0}
            >
                &lt;
            </Button>
            <dialog open className={styles.dialog}>
                <figure id={`image-${selectedIndex}`}>
                    <button className={styles.imgButton} onClick={clickImage}>
                        <Image src={image} alt={image.description} />
                    </button>
                    <figcaption>{image.description}</figcaption>
                </figure>
            </dialog>
            <Button
                className={styles.rightButton}
                onClick={() => changeImage(1)}
                disabled={selectedIndex + 1 > list.length - 1}
            >
                &gt;
            </Button>
        </>
    );
};

export default ImageDialog;
