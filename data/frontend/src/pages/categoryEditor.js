import React from 'react';
import { api } from '../config/api';
import { categorySchema } from '../config/forms';
import Editor from '../components/Editor';

class CategoryEditor extends React.Component {
    render() {
        let id = this.props.match.params.category;
        let readonly = ['name'];
        return (
            <Editor
                {...this.props}
                id={id}
                item={this.props.state.data.categories}
                readonly={readonly}
                schema={categorySchema(this.props)}
                update={api.updateCategory}
                page={'/categories'}
            />
        );
    }
}

export default CategoryEditor;
