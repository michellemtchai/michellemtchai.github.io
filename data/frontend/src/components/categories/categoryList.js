import React from 'react';
import CategoryListItem from './categoryListItem';
import List from '../list/list';

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
