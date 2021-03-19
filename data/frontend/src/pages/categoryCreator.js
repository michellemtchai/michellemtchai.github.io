import React from 'react';
import { api } from '../config/api';
import { categorySchema } from '../config/forms';
import Creator from '../components/creator';

class CategoryCreator extends React.Component {
    render() {
        return (
            <Creator
                {...this.props}
                type="Category"
                schema={categorySchema(this.props)}
                page="/categories"
                create={api.createCategory}
            />
        );
    }
}

export default CategoryCreator;
