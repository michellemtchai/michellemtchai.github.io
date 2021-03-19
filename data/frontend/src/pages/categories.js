import React from 'react';
import Items from '../components/items';
import CategoryList from '../components/categories/categoryList';

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
