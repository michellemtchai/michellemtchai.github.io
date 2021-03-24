import React from 'react';
import { api } from '../config/api';
import { technologySchema } from '../config/forms';
import Editor from '../components/Editor';

class TechnologyEditor extends React.Component {
    render() {
        let id = this.props.match.params.technology;
        let readonly = ['name'];
        return (
            <Editor
                {...this.props}
                id={id}
                item={this.props.state.data.technologies}
                readonly={readonly}
                schema={technologySchema}
                update={api.updateTechnology}
                page={'/technologies'}
            />
        );
    }
}

export default TechnologyEditor;
