import './index.css';
import React from 'react';
import TextField from './text/TextField';
import TagsField from './tags/TagsField';
import FontAwesomeField from './fontAwesome/FontAwesomeField';
import MarkdownField from './markdown/MarkdownField';
import TextBox from './text/TextBox';
import ImageField from './image/ImageField';
import GalleryField from './gallery/GalleryField';
import Options from './options/Options';
import CheckList from './checkbox/CheckList';

class Form extends React.Component {
    state = {
        form: {},
    };
    handleChange = (key, value) => {
        this.setState(
            {
                form: {
                    ...this.state.form,
                    [key]: value,
                },
            },
            () => this.props.update(this.state.form)
        );
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
            value: getValueByKey(this.props, key),
        };
        let Component = typeToComponent(property.type);
        return <Component key={this.key(i)} {...property} />;
    };
    componentDidMount() {
        this.setState(
            {
                form: formData(this.props),
            },
            () => this.props.update(this.state.form)
        );
    }
    render() {
        return (
            <form>
                {Object.keys(
                    this.props.properties
                ).map((key, i) => this.typeInput(key, i))}
            </form>
        );
    }
}

export default Form;

const formData = (props) => {
    let data = {};
    Object.keys(props.properties).forEach(
        (key) => (data[key] = getValueByKey(props, key))
    );
    return data;
};

const getValueByKey = (props, key) => {
    if (props.data === undefined) {
        let entry = props.properties[key];
        return arrayTypes.includes(entry.type) ? [] : '';
    } else {
        return props.data[key];
    }
};

const arrayTypes = ['tags', 'checkbox', 'gallery'];

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
        case 'gallery':
            return GalleryField;
        case 'select':
            return Options;
        case 'checkbox':
            return CheckList;
        default:
            return TextField;
    }
};
