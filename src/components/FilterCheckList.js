import React, { useState } from 'react';

const FilterCheckList = ({ label, value, options }) => {
    const [selected, updateSelected] = useState(value);
    const onChange = (event) => {
        const newSelected = event.target.value;
        updateSelected(newSelected);
    };
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
                        />
                        {option.label}
                    </label>
                ))}
            </section>
        </fieldset>
    );
};

export default FilterCheckList;
