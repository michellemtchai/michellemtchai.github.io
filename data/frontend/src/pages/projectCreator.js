import React from 'react';
import { api } from '../config/api';
import { projectSchema } from '../config/forms';
import Creator from '../components/creator';

class ProjectCreator extends React.Component {
    render() {
        let schema = projectSchema(this.props);
        return (
            <Creator
                {...this.props}
                type="Project"
                schema={schema}
                page="/"
                create={(props, data, next) =>
                    createProject(props, data, next, schema)
                }
            />
        );
    }
}

export default ProjectCreator;

const createProject = (props, data, next, schema) => {
    let mapping = tagNameMapping(props.state.data.tags);
    let [projectTags, newTags] = projectNewTags(
        props,
        data.tags
    );
    if (newTags.length > 0) {
        api.createTag(props, newTags, (err, res) => {
            if (!err) {
                mapping = tagNameMapping(res.tags);
                data.tags = data.tags.map((tag) => mapping[tag]);
                console.log(
                    'created tags',
                    res.tags,
                    mapping,
                    data.tags
                );
                schema.properties.tags.mapping = mapping;
                api.createProject(props, data, next);
            }
        });
    } else {
        data.tags = projectTags;
        api.createProject(props, data, next);
    }
};

export const projectNewTags = (props, tags) => {
    let mapping = tagNameMapping(props.state.data.tags);
    let projectTags = [],
        newTags = [];
    tags.forEach((tag) => {
        let id = mapping[tag];
        if (id) {
            projectTags.push(id);
        } else {
            newTags.push({
                name: tag,
            });
        }
    });
    return [projectTags, newTags];
};

export const tagNameMapping = (tags) => {
    let mapping = {};
    Object.keys(tags).forEach((tag) => {
        mapping[tags[tag].name] = tag;
    });
    return mapping;
};

export const tagListMapping = (tags) => {
    let mapping = {};
    tags.forEach((tag) => {
        mapping[tag.name] = tag._id;
    });
    return mapping;
};
