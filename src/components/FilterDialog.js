import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterButton = ({ closeModal }) => {
    const onSubmit = () => {
        //TODO
        closeModal();
    };
    return (
        <dialog open>
            <section>
                <h1>
                    <FontAwesomeIcon icon={['fa', 'sliders-h']} />
                    Filter Dialog
                </h1>
                <button onClick={closeModal}>&times;</button>
            </section>
            <section>
                <p>hello world</p>
            </section>
            <section>
                <button onClick={closeModal}>Cancel</button>
                <button onClick={onSubmit}>Filter</button>
            </section>
        </dialog>
    );
};

export default FilterButton;
