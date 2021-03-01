import React from 'react';
import { formData } from '../../shared/form';
import TextField from './textField';
import TextBox from './textBox';
import Options from './options';

class Form extends React.Component {
    form = React.createRef();
    key = (index)=>{
        return `${this.props.name}-${index}`;
    }
    typeInput=(property, i)=>{
        property.id=`${this.props.name}-${property.name}`;
        property.update=()=>this.props.update(formData(this.form));
        property.value = this.props.data[property.name];
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
