import React from 'react';
import TechnologyListItem from './TechnologyListItem';
import List from '../list/List';

class TechnologyList extends React.Component {
    render() {
        return (
            <List
                {...this.props}
                baseUrl="/technologies/page"
                keyName="technology"
                component={TechnologyListItem}
                techUseMap={technologyToUseMapping(this.props)}
            />
        );
    }
}

export default TechnologyList;

const technologyToUseMapping = (props) => {
    let projects = props.state.data.projects;
    let mapping = {};
    Object.keys(projects).forEach((key) => {
        let project = projects[key];
        project.technologies.forEach((tech) => {
            if (mapping[tech]) {
                mapping[tech]++;
            } else {
                mapping[tech] = 1;
            }
        });
    });
    return mapping;
};
