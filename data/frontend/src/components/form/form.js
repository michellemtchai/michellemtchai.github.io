import React from 'react';
import css from './index.css';
import { formData } from '../../shared/form';
import TextField from './textField';
import TextBox from './textBox';
import ImageField from './imageField';
import Options from './options';

class Form extends React.Component {
    form = React.createRef();
    key = (index)=>{
        return `${this.props.name}-${index}`;
    }
    dataVal = (name)=>{
        return this.props.data !== undefined ?
            this.props.data[name]: '';
    }
    typeInput=(key, i)=>{
        let property = this.props.properties[key];
        property = {
            ...property,
            name: key,
            id: `${this.props.name}-${key}`,
            update: ()=>this.props.update(formData(this.form)),
            value: this.dataVal(key),
        }
        switch(property.type){
            case 'string':
                return (
                    <TextField key={this.key(i)}
                        {...property}/>
                );
            case 'text':
                return (
                    <TextBox key={this.key(i)}
                        {...property}/>
                );
            case 'image':
                return (
                    <ImageField key={this.key(i)}
                        {...property}/>
                );
            case 'enum':
                return (
                    <Options key={this.key(i)}
                        {...property}/>
                );
            default:
                return (
                    <TextField key={this.key(i)}
                        {...property}/>
                );
        }
    }
    render() {
        return (
            <form ref={this.form}>
                {Object.keys(this.props.properties).map((key,i)=>
                    this.typeInput(key ,i)
                )}
            </form>
        );
    }
}

export default Form;
