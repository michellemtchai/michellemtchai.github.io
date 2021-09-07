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
    let image = list[selectedIndex];
    return (
        <dialog open className={styles.dialog}>
            <Button
                onClick={() => changeImage(-1)}
                disabled={selectedIndex - 1 < 0}
            >
                &lt;
            </Button>
            <figure id={`image-${selectedIndex}`}>
                <Image src={image} alt={image.description} />
                <figcaption>{image.description}</figcaption>
            </figure>
            <Button
                onClick={() => changeImage(1)}
                disabled={selectedIndex + 1 > list.length - 1}
            >
                &gt;
            </Button>
        </dialog>
    );
};

export default ImageDialog;
