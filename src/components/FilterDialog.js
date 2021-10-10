import React from 'react';
import FilterSelect from './FilterSelect';
import FilterCheckList from './FilterCheckList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sortDir } from '../shared/filter';
import * as styles from './FilterDialog.module.scss';

const FilterDialog = ({ closeModal, filters, update, search }) => {
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
                <FilterSelect label="Sort By" {...filters.sortBy} />
                <FilterSelect label="Sort Direction" {...sortDir(search)} />
                <FilterCheckList label="Stacks" {...filters.stacks} />
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
