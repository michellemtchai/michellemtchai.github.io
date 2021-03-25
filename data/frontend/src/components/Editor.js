import React from 'react';
import { goToPage } from '../shared/router';
import { clone } from '../shared/form';
import Form from '../components/form/Form';
import ActionButtons from '../components/form/buttons/ActionButtons';
import NotFound from '../pages/NotFound';

class Editor extends React.Component {
    state = {
        form: null,
    };
    updateForm = (value) => {
        this.setState({
            form: value,
        });
    };
    schema = this.props.state.data.form
        ? schemaForm(this.props)
        : schema(this.props);
    update = () => {
        let id = this.props.id;
        let data = this.state.form;
        this.props.setData({
            form: data,
        });
        window.scrollTo(0, 0);
        this.props.update(
            this.props,
            id,
            {
                data: data,
                exported: this.props.state.data.exported,
            },
            (_) => {
                goToPage(this.props.page, this.props);
            }
        );
    };
    render() {
        return this.schema.data ? (
            <div>
                <Form
                    {...this.schema}
                    update={this.updateForm}
                />
                <ActionButtons
                    cancel={() =>
                        goToPage(this.props.page, this.props)
                    }
                    save={this.update}
                />
            </div>
        ) : (
            <NotFound {...this.props} />
        );
    }
}

export default Editor;

const schema = (props) => {
    let id = props.id;
    let schema = {
        ...clone(props.schema),
        id: id,
        data: props.item[id],
    };
    props.readonly.forEach((key) => {
        schema.properties[key].readonly = true;
    });
    return schema;
};

const schemaForm = (props) => {
    let id = props.id;
    let schema = {
        ...clone(props.schema),
        id: id,
        data: props.state.data.form,
    };
    props.readonly.forEach((key) => {
        schema.properties[key].readonly = true;
    });
    return schema;
};
