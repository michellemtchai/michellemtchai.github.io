import React from 'react';
import Items from '../components/Items';
import CategoryList from '../components/categories/CategoryList';

class Categories extends React.Component {
    render() {
        console.log('props', this.props.state.data.projects);
        return (
            <Items
                {...this.props}
                name="Category"
                keyName="categories"
                list={CategoryList}
            />
        );
    }
}

export default Categories;
