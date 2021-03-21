import React from 'react';
import { api } from '../config/api';
import { projectSchema } from '../config/forms';
import {
    tagNameMapping,
    projectNewTags,
    tagListMapping,
} from './projectCreator';
import Editor from '../components/editor';

class ProjectEditor extends React.Component {
    render() {
        let id = this.props.match.params.project;
        let readonly = ['name'];
        return (
            <Editor
                {...this.props}
                id={id}
                item={this.props.state.data.projects}
                readonly={readonly}
                schema={projectSchema(this.props)}
                update={updateProject}
                page={'/projects/' + id}
            />
        );
    }
}

export default ProjectEditor;

const updateProject = (props, id, data, next) => {
    let mapping = tagNameMapping(props.state.data.tags);
    let [projectTags, newTags] = projectNewTags(
        props,
        data.tags
    );
    if (newTags.length > 0) {
        api.createTag(props, newTags, (err, data) => {
            if (!err) {
                mapping = tagListMapping(data);
                data.tags = data.tags.map((tag) => mapping[tag]);
                api.updateProject(props, id, data, next);
            }
        });
    } else {
        data.tags = projectTags;
        api.updateProject(props, id, data, next);
    }
};
