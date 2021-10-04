import React from 'react';

const FilterButton = ({ closeModal }) => {
    return (
        <dialog open>
            <h1>Filter Dialog</h1>
            <button onClick={closeModal}>&times;</button>
            <p>hello world</p>
        </dialog>
    );
};

export default FilterButton;
