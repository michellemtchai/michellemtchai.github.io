import React, { useState } from 'react';
import Modal from './Modal';
import FilterDialog from './FilterDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from './FilterButton.module.scss';

const FilterButton = () => {
    const [show, updateShow] = useState(false);
    const openDialog = () => {
        updateShow(true);
    };
    return (
        <>
            <button className={styles.filterButton} onClick={openDialog}>
                <FontAwesomeIcon icon={['fa', 'sliders-h']} />
                Filter
            </button>
            <Modal show={show} updateShow={updateShow}>
                <FilterDialog closeModal={() => updateShow(false)} />
            </Modal>
        </>
    );
};

export default FilterButton;
