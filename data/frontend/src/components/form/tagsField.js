import React from 'react';
import { api } from '../../config/api';

class TagsField extends React.Component {
    state = {
        value: tagValues(this.props),
        input: '',
    };
    handleChange = (event) => {
        this.setState({
            input: event.target.value,
        });
    };
    removeTag = (index) => {
        let tags = [...this.state.value];
        tags.splice(index, 1);
        this.setState(
            {
                ...this.state,
                value: tags,
            },
            () => this.props.update(this.state.value)
        );
    };
    readonly = () => {
        let result = this.props.readonly
            ? this.props.readonly
            : false;
        return result;
    };
    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            let tags = [...this.state.value];
            tags.push(this.state.input);
            this.setState(
                {
                    value: tags,
                    input: '',
                },
                () => this.props.update(this.state.value)
            );
        }
    };
    render() {
        return (
            <fieldset className="form-group">
                <label htmlFor={this.props.id}>
                    {this.props.label}:
                </label>
                <ul className="tags">
                    {this.state.value.map((tag, i) => (
                        <li key={'tag-' + i}>
                            <span>{tag}</span>
                            <span
                                onClick={() => this.removeTag(i)}
                            >
                                &times;
                            </span>
                        </li>
                    ))}
                </ul>
                <input
                    className="form-control"
                    key={this.props.id}
                    id={this.props.id}
                    type="text"
                    name={this.props.name}
                    onChange={this.handleChange}
                    value={this.state.input}
                    readOnly={this.readonly()}
                    placeholder={this.props.placeholder}
                    onKeyPress={this.onKeyPress}
                />
            </fieldset>
        );
    }
}

export default TagsField;

const tagValues = (props) => {
    let tags = props.value;
    return tags.map((tag) => props.mapping[tag]);
};

const focusStyle = {
    border: '1px solid #ccc',
    boxShadow: 'none',
};
