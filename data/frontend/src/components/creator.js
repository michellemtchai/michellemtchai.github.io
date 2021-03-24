import React from 'react';
import { goToPage } from '../shared/router';
import Form from './form/Form';
import ActionButtons from './form/buttons/ActionButtons';

class Creator extends React.Component {
    state = {
        form: null,
    };
    updateForm = (value) => {
        this.setState({
            form: value,
        });
    };
    create = () => {
        let data = this.state.form;
        this.props.setData({
            form: data,
        });
        window.scrollTo(0, 0);
        this.props.create(this.props, data, (_) => {
            goToPage(this.props.page, this.props);
        });
    };
    render() {
        let schema = this.props.state.data.form
            ? {
                  ...this.props.schema,
                  data: this.props.state.data.form,
              }
            : this.props.schema;
        return (
            <div>
                <Form {...schema} update={this.updateForm} />
                <ActionButtons
                    text={`Create New ${this.props.type}`}
                    cancel={() =>
                        goToPage(this.props.page, this.props)
                    }
                    save={this.create}
                />
            </div>
        );
    }
}

export default Creator;
