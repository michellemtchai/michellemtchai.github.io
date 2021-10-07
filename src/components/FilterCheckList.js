import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import * as styles from './FilterCheckList.module.scss';
library.add(fas, far);

const FilterCheckList = ({ label, value, options }) => {
    const [selectAll, updateSelectAll] = useState(value === 'all');
    const selectValues = (selectAll) => {
        let mapping = {};
        options.forEach((option) => {
            mapping[option.value] = selectAll;
        });
        return mapping;
    };
    const [selected, updateSelected] = useState(selectValues(value === 'all'));
    const onSelectAll = () => {
        const newValue = !selectAll;
        updateSelectAll(newValue);
        const selectedStacks = selectValues(newValue);
        updateSelected(selectedStacks);
    };
    const onChange = (event) => {
        const target = event.target.value;
        const newSelected = { ...selected, [target]: !selected[target] };
        updateSelected(newSelected);
        let count = 0;
        Object.keys(newSelected).forEach((key) => {
            if (newSelected[key]) {
                count++;
            }
        });
        updateSelectAll(count === options.length);
    };
    const CheckBox = ({ checked }) => {
        const icon = checked ? ['fas', 'check-square'] : ['far', 'square'];
        return <FontAwesomeIcon icon={icon} />;
    };
    return (
        <fieldset className={styles.fieldset}>
            <section className={styles.heading}>
                <label>{label}:</label>
                <label
                    htmlFor="check-all"
                    className={selectAll && styles.checked}
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
            </section>
            <section className={styles.body}>
                {options.map((option) => (
                    <label
                        key={option.value}
                        htmlFor={option.value}
                        className={selected[option.value] && styles.checked}
                    >
                        <input
                            type="checkbox"
                            id={option.value}
                            name={option.value}
                            value={option.value}
                            checked={selected[option.value]}
                            onChange={onChange}
                        />
                        <CheckBox checked={selected[option.value]} />
                        {option.label}
                    </label>
                ))}
            </section>
        </fieldset>
    );
};

export default FilterCheckList;
