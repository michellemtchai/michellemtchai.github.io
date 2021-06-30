import React from 'react';
import { clone } from '../shared/form';
import { projectSchema } from '../config/forms';
import Creator from '../components/Creator';

class ProjectCreator extends React.Component {
    state = {
        tags: {},
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
        let schema = projectSchema(this.props);
        return (
            <Creator
                {...this.props}
                type="Project"
                schema={schema}
                page="/"
                create={(...args) =>
                    createProject(this.state.tags, ...args)
                }
            />
        );
    }
}

export default ProjectCreator;

const createProject = (tags, props, data, next, schema) => {
    // let mapping = tagNameMapping(tags);
    // let [projectTags, newTags] = projectNewTags(
    //     props,
    //     data.tags
    // );
    // let copy = clone(data);
    // if (newTags.length > 0) {
    //     api.createTag(
    //         props,
    //         newTags,
    //         (res) => {
    //             mapping = tagNameMapping(res.tags);
    //             copy.tags = copy.tags.map((tag) => mapping[tag]);
    //             api.createProject(props, copy, next);
    //         },
    //         false
    //     );
    // } else {
    //     copy.tags = projectTags;
    //     api.createProject(props, copy, next);
    // }
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
