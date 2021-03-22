import React from 'react';
import Tabs from '../../tabs/Tabs';
import Markdown from '../../markdown/Markdown';

class MarkdownField extends React.Component {
    state = {
        value: this.props.value ? this.props.value : '',
    };
    handleChange = (event) => {
        this.setState(
            {
                value: event.target.value,
            },
            () => this.props.update(this.state.value)
        );
    };
    readonly = () => {
        let result = this.props.readonly
            ? this.props.readonly
            : false;
        return result;
    };
    render() {
        return (
            <fieldset className="form-group">
                <label htmlFor={this.props.id}>
                    {this.props.label}:
                </label>
                <Tabs tabs={tabData(this)} />
            </fieldset>
        );
    }
}

export default MarkdownField;

const style = {
    resize: 'none',
    height: '200px',
    overflowY: 'auto',
    border: '1px solid #eee',
    padding: '10px 20px',
    borderRadius: '0',
};
const tabData = (comp) => [
    {
        name: 'Markdown',
        component: (
            <textarea
                className="form-control"
                key={comp.props.id}
                id={comp.props.id}
                type="text"
                style={style}
                name={comp.props.name}
                onChange={comp.handleChange}
                value={comp.state.value}
                readOnly={comp.readonly()}
                placeholder={comp.props.placeholder}
            />
        ),
    },
    {
        name: 'Preview',
        component: (
            <Markdown value={comp.state.value} style={style} />
        ),
    },
];
