import React from 'react';
import Button from '../form/button';
import { editItem, deleteItem } from '../../shared/pages';
import { api } from '../../config/api';

class CategoryListItem extends React.Component {
    editCategory = () => {
        editItem(this.props, '/categories', 'category');
    };
    deleteCategory = () => {
        deleteItem(
            this.props,
            'category',
            api.removeCategoryById,
            '/categories'
        );
    };
    render() {
        let category = this.props.category;
        return (
            <li>
                <article>
                    <h2>{category.name}</h2>
                    <p>
                        <b>Description:</b> {category.description}
                    </p>
                    <Button
                        text="Edit Category"
                        click={this.editCategory}
                    />
                    <Button
                        text="Delete Category"
                        click={this.deleteCategory}
                        type="danger"
                    />
                </article>
            </li>
        );
    }
}

export default CategoryListItem;
