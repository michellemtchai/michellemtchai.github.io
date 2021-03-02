import React from 'react';
import Option from './option';

class Options extends React.Component {
    selector = React.createRef();
    state = {
        value: this.props.value,
    }
    handleChange=(event)=>{
        this.setState({
            value: event.target.value
        }, ()=>this.props.update());
    }
    click = ()=>{
        this.selector.current.click();
    }
    render() {
        let style = this.state.value == ''? 'unselected': '';
        let options = [{
            value: '',
            label: this.props.placeholder,
        }, ...this.props.options];
        return (
            <fieldset className='label-option'>
                <label htmlFor={this.props.name}>
                    {this.props.label}:
                </label>
                <select name={this.props.name}
                    id={this.props.name}
                    className={style+' form-control'}
                    value={this.state.value}
                    onChange={this.handleChange}>
                    {options.map((option,i)=>
                         <Option key={`option-${this.props.name}-${i}`}
                             option={option}
                             value={option.value}/>
                    )}
                </select>
                <i className="fas fa-caret-down"
                    onClick={this.click}></i>
            </fieldset>
        );
    }
}

export default Options;
