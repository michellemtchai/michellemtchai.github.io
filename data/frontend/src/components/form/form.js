import './index.css';
import React from 'react';
import TextField from './textField';
import TagsField from './tagsField';
import FontAwesomeField from './fontAwesomeField';
import MarkdownField from './markdownField';
import TextBox from './textBox';
import ImageField from './imageField';
import Options from './options';
import CheckList from './checkList';

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
        let Component = typeToComponent(property.type);
        return <Component key={this.key(i)} {...property} />;
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

const typeToComponent = (type) => {
    switch (type) {
        case 'string':
            return TextField;
        case 'tags':
            return TagsField;
        case 'font-awesome':
            return FontAwesomeField;
        case 'text':
            return TextBox;
        case 'markdown':
            return MarkdownField;
        case 'image':
            return ImageField;
        case 'select':
            return Options;
        case 'checkbox':
            return CheckList;
        default:
            return TextField;
    }
};
