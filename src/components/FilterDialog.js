import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from './FilterDialog.module.scss';

const FilterDialog = ({ closeModal }) => {
    const onSubmit = () => {
        //TODO
        closeModal();
    };
    return (
        <dialog open className={styles.dialog}>
            <section className={styles.header}>
                <h1>
                    <FontAwesomeIcon icon={['fa', 'sliders-h']} />
                    Filter Dialog
                </h1>
                <button onClick={closeModal}>&times;</button>
            </section>
            <section className={styles.body}>
                <p>hello world</p>
            </section>
            <section className={styles.footer}>
                <button className={styles.cancel} onClick={closeModal}>
                    Cancel
                </button>
                <button className={styles.submit} onClick={onSubmit}>
                    Filter
                </button>
            </section>
        </dialog>
    );
};

export default FilterDialog;
