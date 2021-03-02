import React from 'react';

class TextField extends React.Component {
    state = {
        value: this.props.value ?
            this.props.value : '',
        focus: false,
    }
    handleChange=(event)=>{
        this.setState({
            ...this.state,
            value: event.target.value
        }, ()=>this.props.update());
    }
    changeMode = ()=>{
        this.setState({
            ...this.state,
            focus: !this.state.focus,
        })
    }
    style=()=>{
        let style = {};
        if(this.state.focus){
            style = focusStyle;
        }
        return style;
    }
    readonly =()=>{
        let result = this.props.readonly ?
            this.props.readonly: false;
        return result;
    }
    render() {
        return (
            <fieldset className='form-group'>
                <label htmlFor={this.props.id}>
                    {this.props.label}:
                </label>
                <input className='form-control'
                    key={this.props.id}
                    id={this.props.id}
                    type='text'
                    name={this.props.name}
                    onChange={this.handleChange}
                    style={this.style()}
                    onBlur={this.changeMode}
                    onFocus={this.changeMode}
                    value={this.state.value}
                    readOnly={this.readonly()}
                    placeholder={this.props.placeholder}/>
            </fieldset>
        );
    }
}

export default TextField;

const focusStyle = {
    border: '1px solid #ccc',
    boxShadow: 'none',
}
