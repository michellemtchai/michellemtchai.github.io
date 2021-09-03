import React, { useState, useEffect } from 'react';
import Image from './Image';
import Button from './Button';

const ImageDialog = ({ list, selected, updateSelected }) => {
    const [selectedIndex, setSelectedIndex] = useState(selected);
    useEffect(() => {
        setSelectedIndex(selected);
    }, [selected]);
    const changeImage = (increment) => {
        const index = selectedIndex + increment;
        if (index >= 0 && index < list.length - 1) {
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
            <figure>
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
