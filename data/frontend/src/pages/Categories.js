import React from 'react';
import Items from '../components/Items';
import CategoryList from '../components/categories/CategoryList';

class Categories extends React.Component {
    render() {
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
