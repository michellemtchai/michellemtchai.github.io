import './index.css';
import React from 'react';

class CheckBox extends React.Component {
    state = initialState(this.props);
    updateValue = (event) => {
        let value = event.target.value;
        let selected = [...this.state.selected];
        if (selected.includes(value)) {
            let index = selected.indexOf(value);
            selected.splice(index, 1);
        } else {
            selected.push(value);
        }
        this.setState(
            { ...this.state, selected: selected },
            () => this.props.update(this.state)
        );
    };
    selectAll = () => {
        let options = this.props.options;
        let selected = this.state.selected;
        let allSelected = selected.length === options.length;
        if (allSelected) {
            this.setState({ ...this.state, selected: [] }, () =>
                this.props.update(this.state)
            );
        } else {
            this.setState(
                {
                    ...this.state,
                    selected: this.state.defStacks,
                },
                () => this.props.update(this.state)
            );
        }
    };
    render() {
        let name = this.props.name;
        let options = this.props.options;
        let selected = this.state.selected;
        return (
            <section className="checkbox">
                <label>{this.props.label}</label>
                <CheckItem
                    key={name + '-checkbox-0'}
                    name={name}
                    index={0}
                    update={this.selectAll}
                    checked={selected.length === options.length}
                    label="All"
                />
                <section>
                    {options.map((option, i) => (
                        <CheckItem
                            key={name + '-checkbox-' + i}
                            name={name}
                            index={i + 1}
                            value={option.value}
                            update={this.updateValue}
                            checked={selected.includes(
                                option.value
                            )}
                            label={option.label}
                        />
                    ))}
                </section>
            </section>
        );
    }
}

export default CheckBox;

const initialState = (props) => {
    return {
        defStacks: props.defStacks,
        selected: props.selected,
    };
};

const CheckItem = (props) => {
    return (
        <label
            htmlFor={`${props.name}-${props.index}`}
            className={props.checked ? 'checked' : 'unchecked'}
        >
            <input
                type="checkbox"
                name={props.name}
                id={`${props.name}-${props.index}`}
                value={props.value}
                onChange={props.update}
                checked={props.checked}
            />
            {props.label}
        </label>
    );
};
