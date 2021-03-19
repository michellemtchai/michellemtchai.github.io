import React from 'react';
import Items from '../components/items';
import TechnologyList from '../components/technologies/technologyList';

class Technologies extends React.Component {
    render() {
        return (
            <Items
                {...this.props}
                name="Technology"
                keyName="technologies"
                list={TechnologyList}
            />
        );
    }
}

export default Technologies;
