import React from 'react';

class TextBox extends React.Component {
    state = {
        value: this.props.value ?
            this.props.value : ''
    }
    handleChange=(event)=>{
        this.setState({
            value: event.target.value
        })
        this.props.update();
    }
    resize=()=>{
        let resizeable = this.props.resize?
            this.props.resize: false;
        return resizeable? {}:{ resize: 'none' };
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
                    style={this.resize()}
                    name={this.props.name}
                    onChange={this.handleChange}
                    value={this.state.value}
                    placeholder={this.props.placeholder}/>
            </fieldset>
        );
    }
}

export default TextBox;
