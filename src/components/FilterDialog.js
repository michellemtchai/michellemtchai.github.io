import React, { useState } from 'react';
import FilterSelect from './FilterSelect';
import FilterCheckList from './FilterCheckList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from './FilterDialog.module.scss';
import { navigate } from 'gatsby';

const FilterDialog = ({ query, category, closeModal, filters, search }) => {
    const [sortBy, updateSortBy] = useState(filters.sortBy.value);
    const [sortDir, updateSortDir] = useState(filters.sortDir.value);
    const [stacks, updateStacks] = useState(filters.stacks.value);
    const updateStacksGlobal = (stacks, updateGlobal = false) => {
        updateStacks(stacks);
        if (updateGlobal) {
            filters.stacks.update(stacks);
        }
    };
    const sortByFilter = {
        ...filters.sortBy,
        value: sortBy,
        update: updateSortBy,
    };
    const sortDirFilter = {
        ...filters.sortDir,
        value: sortDir,
        update: updateSortDir,
    };
    const stackFilter = {
        ...filters.stacks,
        value: stacks,
        update: updateStacksGlobal,
    };
    const onSubmit = () => {
        filters.sortBy.update(sortBy);
        filters.sortDir.update(sortDir);
        filters.stacks.update(stacks);
        closeModal();
        navigate(search ? `/search/${category}/${query}` : `/${category}`);
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
                <FilterSelect label="Sort By" {...sortByFilter} />
                <FilterSelect label="Sort Direction" {...sortDirFilter} />
                <FilterCheckList label="Stacks" {...stackFilter} />
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
