import React from 'react';
import TagListItem from './TagListItem';
import List from '../list/List';

class TagList extends React.Component {
    render() {
        return (
            <List
                {...this.props}
                baseUrl="/tags/page"
                keyName="tag"
                clickable={true}
                component={TagListItem}
                tagUseMap={tagToUseMapping(this.props)}
            />
        );
    }
}

export default TagList;

const tagToUseMapping = (props) => {
    let projects = props.state.data.projects;
    let mapping = {};
    Object.keys(projects).forEach((key) => {
        let project = projects[key];
        project.tags.forEach((tag) => {
            if (mapping[tag]) {
                mapping[tag]++;
            } else {
                mapping[tag] = 1;
            }
        });
    });
    return mapping;
};
