import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterButton = ({ closeModal }) => {
    return (
        <dialog open>
            <h1>
                <FontAwesomeIcon icon={['fa', 'sliders-h']} />
                Filter Dialog
            </h1>
            <button onClick={closeModal}>&times;</button>
            <p>hello world</p>
        </dialog>
    );
};

export default FilterButton;
