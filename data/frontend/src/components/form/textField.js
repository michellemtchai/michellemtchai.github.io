import React from 'react';

class TextField extends React.Component {
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
                    value={this.state.value}
                    rows={this.props.rows ? this.props.rows : 3}
                    placeholder={this.props.placeholder}/>
            </fieldset>
        );
    }
}

export default TextField;
