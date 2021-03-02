import React from 'react';
import TextField from './textField';
import LongButton from './longButton';
import ActionButtons from './actionButtons';
import { formData } from '../../shared/form';

class ImageField extends React.Component {
    input = React.createRef();
    state = {
        value: this.props.value ?
            this.props.value : '',
        tempValue: null,
        mode: null,
    }
    updateURL = ()=>{
        let value = this.input.current.state.value;
        this.setState({
            ...this.state,
            tempValue: value,
        })
    }
    saveChanges=()=>{
        let temp = this.state.tempValue;
        this.setState({
            ...this.state,
            value: temp,
            tempValue: null,
        }, ()=>{
            this.changeMode('');
            this.props.update(this.state.value);
        })
    }
    cancelChanges=()=>{
        this.setState({
            ...this.state,
            tempValue: null,
        }, ()=>this.changeMode(''))
    }
    changeMode = (mode)=>{
        this.setState({
            ...this.state,
            mode: mode,
        })
    }
    urlPlaceholder = ()=>{
        return this.props.placeholder ?
            this.props.placeholder : 'Enter an image URL';
    }
    textFieldData =()=>{
        return {
            ...this.props,
            label: 'Image URL',
            value: this.state.value,
            update: this.updateURL,
            placeholder: this.urlPlaceholder(),
        }
    }
    columnTwo = ()=>{
        switch(this.state.mode){
            case 'url':
                return (
                    <td>
                        <TextField ref={this.input}
                            {...this.textFieldData()}/>
                        <ActionButtons
                            text='Use Image URL'
                            save={this.saveChanges}
                            cancel={this.cancelChanges}/>
                    </td>
                );
            case 'upload':
                return (
                    <td>
                        <ActionButtons
                            text='Use Image'
                            save={this.saveChanges}
                            cancel={this.cancelChanges}/>
                    </td>
                );
            default:
                return (
                    <td>
                        <input className='form-control'
                            id={this.props.id}
                            type='hidden'
                            name={this.props.name}
                            value={this.state.value}/>
                        <LongButton text='Enter URL'
                            click={()=>this.changeMode('url')}/>
                        <LongButton text='Upload Image'
                            click={()=>this.changeMode('upload')}/>
                    </td>
                );
        }
    }
    render() {
        let ColumnTwo = this.columnTwo;
        return (
            <fieldset className='form-group'>
                <label>
                    {this.props.label}:
                </label>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img src={this.state.value}
                                    alt='Image Preview'/>
                            </td>
                            <ColumnTwo />
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        );
    }
}

export default ImageField;
