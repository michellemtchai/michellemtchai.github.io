import React from 'react';
import { goToPage } from '../shared/router';
import { formData } from '../shared/form';
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
    form = React.createRef();
    create = () => {
        let data = this.state.form;
        this.props.setData({
            form: data,
        });
        this.props.create(this.props, data, (err) => {
            if (!err) {
                goToPage(this.props.page, this.props);
            }
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
