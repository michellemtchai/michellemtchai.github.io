import React, { useState } from 'react';

const FilterSelect = ({ label, value, options }) => {
    const [selected, updateSelected] = useState(value);
    const onChange = (event) => {
        const newSelected = event.target.value;
        updateSelected(newSelected);
    };
    return (
        <fieldset>
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
