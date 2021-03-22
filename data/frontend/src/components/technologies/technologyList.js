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
            />
        );
    }
}

export default TechnologyList;
