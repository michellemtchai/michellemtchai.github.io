import React from 'react';
import CategoryListItem from './CategoryListItem';
import List from '../list/List';

class CategoryList extends React.Component {
    render() {
        return (
            <List
                {...this.props}
                baseUrl="/categories/page"
                keyName="category"
                component={CategoryListItem}
            />
        );
    }
}

export default CategoryList;
