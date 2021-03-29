import React from 'react';
import { api } from '../config/api';
import { clone } from '../shared/form';
import { projectSchema } from '../config/forms';
import {
    tagNameMapping,
    projectNewTags,
} from './ProjectCreator';
import Editor from '../components/Editor';

class ProjectEditor extends React.Component {
    state = {
        tags: this.props.state.data.tags,
    };
    componentDidUpdate(prevProps) {
        if (
            prevProps.state.data.tags !==
            this.props.state.data.tags
        ) {
            this.setState({
                tags: this.props.state.data.tags,
            });
        }
    }
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
                update={(...args) =>
                    updateProject(this.state.tags, ...args)
                }
                page={'/projects/' + id}
            />
        );
    }
}

export default ProjectEditor;

const updateProject = (tags, props, id, data, next) => {
    let mapping = tagNameMapping(tags);
    let [projectTags, newTags] = projectNewTags(
        props,
        data.tags
    );
    let copy = clone(data);
    if (newTags.length > 0) {
        api.createTag(
            props,
            newTags,
            (res) => {
                mapping = tagNameMapping(res.tags);
                copy.tags = copy.tags.map((tag) => mapping[tag]);
                api.updateProject(props, id, copy, next);
            },
            false
        );
    } else {
        copy.tags = projectTags;
        api.updateProject(props, id, copy, next);
    }
};
