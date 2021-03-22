import React from 'react';
import Items from '../components/Items';
import TechnologyList from '../components/technologies/TechnologyList';

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
