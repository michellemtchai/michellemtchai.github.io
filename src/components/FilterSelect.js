import React, { useState } from 'react';
import * as styles from './FilterSelect.module.scss';

const FilterSelect = ({ label, value, options }) => {
    const [selected, updateSelected] = useState(value);
    const onChange = (event) => {
        const newSelected = event.target.value;
        updateSelected(newSelected);
    };
    return (
        <fieldset className={styles.fieldset}>
            <label>{label}:</label>
            <select value={selected} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </fieldset>
    );
};

export default FilterSelect;
