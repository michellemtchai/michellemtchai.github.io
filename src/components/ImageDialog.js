import React, { useState, useEffect } from 'react';
import { useKeyPress } from '../hooks/keys';
import Image from './Image';
import Button from './Button';

const ImageDialog = ({ list, selected, updateSelected }) => {
    const [selectedIndex, setSelectedIndex] = useState(selected);
    const pressLeftArrow = useKeyPress('ArrowLeft');
    const pressRightArrow = useKeyPress('ArrowRight');
    useEffect(() => {
        if (pressLeftArrow) {
            changeImage(-1);
        } else if (pressRightArrow) {
            changeImage(1);
        }
    }, [pressLeftArrow, pressRightArrow]);
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
        <dialog open>
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
