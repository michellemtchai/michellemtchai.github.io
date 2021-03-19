import React from 'react';
import TechnologyListItem from './technologyListItem';
import List from '../list/list';

class TechnologyList extends React.Component {
    render() {
        return (
            <List
                {...this.props}
                baseUrl="/technologies/page"
                keyName="technology"
                component={TechnologyListItem}
            />
        );
    }
}

export default TechnologyList;
