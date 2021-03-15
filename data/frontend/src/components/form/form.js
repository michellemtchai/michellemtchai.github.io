import './index.css';
import React from 'react';
import TextField from './textField';
import TextBox from './textBox';
import ImageField from './imageField';
import Options from './options';

class Form extends React.Component {
    form = React.createRef();
    state = {
        form: formData(this.props),
    };
    handleChange = (key, value) => {
        this.setState({
            form: {
                ...this.state.form,
                [key]: value,
            },
        });
    };
    key = (index) => {
        return `${this.props.name}-${index}`;
    };
    typeInput = (key, i) => {
        let property = this.props.properties[key];
        property = {
            ...property,
            name: key,
            id: `${this.props.name}-${key}`,
            update: (val) => this.handleChange(key, val),
            value: this.state.form[key],
        };
        switch (property.type) {
            case 'string':
                return <TextField key={this.key(i)} {...property} />;
            case 'text':
                return <TextBox key={this.key(i)} {...property} />;
            case 'image':
                return <ImageField key={this.key(i)} {...property} />;
            case 'enum':
                return <Options key={this.key(i)} {...property} />;
            default:
                return <TextField key={this.key(i)} {...property} />;
        }
    };
    render() {
        return (
            <form ref={this.form}>
                {Object.keys(this.props.properties).map((key, i) =>
                    this.typeInput(key, i)
                )}
            </form>
        );
    }
}

export default Form;

const formData = (props) => {
    let data = {};
    Object.keys(props.properties).forEach((key) => {
        data[key] = props.data !== undefined ? props.data[key] : '';
    });
    return data;
};
