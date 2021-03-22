import React from 'react';
import Items from '../components/Items';
import TagList from '../components/tags/TagList';

class Tags extends React.Component {
    render() {
        return (
            <Items
                {...this.props}
                keyName="tags"
                list={TagList}
            />
        );
    }
}

export default Tags;
