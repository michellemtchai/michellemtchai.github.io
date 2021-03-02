import React from 'react';

class TextBox extends React.Component {
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
        let resizeable = this.props.resize?
            this.props.resize: false;
        let style = resizeable? {}:{ resize: 'none'};
        if(this.state.focus){
            style = {
                ...style,
                ...focusStyle,
            }
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
                <textarea className='form-control'
                    key={this.props.id}
                    id={this.props.id}
                    type='text'
                    style={this.style()}
                    name={this.props.name}
                    onChange={this.handleChange}
                    value={this.state.value}
                    onBlur={this.changeMode}
                    onFocus={this.changeMode}
                    readOnly={this.readonly()}
                    rows={this.props.rows ? this.props.rows : 3}
                    placeholder={this.props.placeholder}/>
            </fieldset>
        );
    }
}

export default TextBox;

const focusStyle = {
    border: '1px solid #ccc',
    boxShadow: 'none',
}
