import React from 'react';
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
    dataVal = (property)=>{
        return this.props.data !== undefined ?
            this.props.data[property.name]: '';
    }
    typeInput=(property, i)=>{
        property.id=`${this.props.name}-${property.name}`;
        property.update=()=>this.props.update(formData(this.form));
        property.value = this.dataVal(property);
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
                {this.props.properties.map((property,i)=>
                    this.typeInput(property,i)
                )}
            </form>
        );
    }
}

export default Form;
