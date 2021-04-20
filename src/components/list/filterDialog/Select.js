import React from 'react';

class Select extends React.Component {
    render() {
        let name = this.props.name;
        return (
            <section className="dialog-entry">
                <label>{this.props.label}</label>
                <select
                    onChange={this.props.update}
                    value={this.props.selected}
                >
                    {this.props.options.map((option, i) => (
                        <option
                            key={name + '-select-option-' + i}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </section>
        );
    }
}

export default Select;
