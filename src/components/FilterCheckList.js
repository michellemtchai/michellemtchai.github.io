import React, { useState, useEffect } from 'react';

const FilterCheckList = ({ label, value, options }) => {
    const [selectAll, updateSelectAll] = useState(value === 'all');
    const selectValues = () => {
        return selectAll ? options.map((i) => i.value) : [];
    };
    const [selected, updateSelected] = useState(selectValues());
    const onSelectAll = () => {
        updateSelectAll(!selectAll);
        updateSelected(selectValues());
    };
    const onChange = (event) => {
        const newSelected = event.target.value;
        const selectedCopy = [...selected];
        if (selected.includes(newSelected)) {
            const index = selectedCopy.indexOf(newSelected);
            if (index !== -1) {
                selectedCopy.splice(index, 1);
            }
        } else {
            selectedCopy.push(newSelected);
        }
        updateSelected(selectedCopy);
    };
    useEffect(() => {
        updateSelectAll(selected.length === options.length);
    }, [selected]);
    return (
        <fieldset>
            <section>
                <label>{label}:</label>
                <label htmlFor="check-all">
                    <input
                        type="checkbox"
                        id="check-all"
                        name="check-all"
                        value="all"
                        defaultChecked={selectAll}
                        onChange={onSelectAll}
                    />
                    All
                </label>
            </section>
            <section>
                {options.map((option) => (
                    <label key={option.value} htmlFor={option.value}>
                        <input
                            type="checkbox"
                            id={option.value}
                            name={option.value}
                            value={option.value}
                            defaultChecked={selected.includes(option.value)}
                            onChange={onChange}
                        />
                        {option.label}
                    </label>
                ))}
            </section>
        </fieldset>
    );
};

export default FilterCheckList;
