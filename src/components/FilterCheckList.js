import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import * as styles from './FilterCheckList.module.scss';
library.add(fas, far);

const FilterCheckList = ({
    label,
    value,
    options,
    update,
    initialized,
    updateInitialized,
}) => {
    const hasSelectedAll = (selected) => {
        return selected.length === options.length;
    };
    const [selectAll, updateSelectAll] = useState(
        initialized ? hasSelectedAll(value) : true
    );
    const selectValues = (selectAll) => {
        let selected = [];
        if (selectAll) {
            options.forEach((option) => {
                selected.push(option.value);
            });
        }
        return selected;
    };
    const [selected, updateSelected] = useState(
        initialized ? value : selectValues(true)
    );
    useEffect(() => {
        if (!initialized) {
            updateInitialized(true);
            update(selectValues(true), true);
        }
    }, []);
    const onSelectAll = () => {
        const newValue = !selectAll;
        updateSelectAll(newValue);
        const selectedStacks = selectValues(newValue);
        updateSelected(selectedStacks);
        update(selectedStacks);
    };
    const onChange = (event) => {
        const target = event.target.value;
        let newSelected = [...selected];
        if (newSelected.includes(target)) {
            const index = newSelected.indexOf(target);
            newSelected.splice(index, 1);
        } else {
            newSelected.push(target);
        }
        updateSelected(newSelected);
        update(newSelected);
        updateSelectAll(hasSelectedAll(newSelected));
    };
    const CheckBox = ({ checked }) => {
        const icon = checked ? ['fas', 'check-square'] : ['far', 'square'];
        return <FontAwesomeIcon icon={icon} />;
    };
    return (
        <fieldset className={styles.fieldset}>
            <section className={styles.heading}>
                <label>{label}:</label>
                {options.length > 0 && (
                    <label
                        htmlFor="check-all"
                        className={selectAll ? styles.checked : undefined}
                    >
                        <input
                            type="checkbox"
                            id="check-all"
                            name="check-all"
                            value="all"
                            checked={selectAll}
                            onChange={onSelectAll}
                        />
                        <CheckBox checked={selectAll} />
                        All
                    </label>
                )}
            </section>
            <section className={styles.body}>
                {options.length > 0 ? (
                    options.map((option) => (
                        <label
                            key={option.value}
                            htmlFor={option.value}
                            className={
                                selected.includes(option.value)
                                    ? styles.checked
                                    : undefined
                            }
                        >
                            <input
                                type="checkbox"
                                id={option.value}
                                name={option.value}
                                value={option.value}
                                checked={selected.includes(option.value)}
                                onChange={onChange}
                            />
                            <CheckBox
                                checked={selected.includes(option.value)}
                            />
                            {option.label}
                        </label>
                    ))
                ) : (
                    <p>There are no options.</p>
                )}
            </section>
        </fieldset>
    );
};

export default FilterCheckList;
