import React from 'react';
import { categorySchema } from '../config/forms';
import Creator from '../components/Creator';

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
