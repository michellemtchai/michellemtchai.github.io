import React from 'react';

class Option extends React.Component {
    render() {
        let option = this.props.option;
        return (
            <option value={option.value}>
                {option.label}
            </option>
        );
    }
}

export default Option;
