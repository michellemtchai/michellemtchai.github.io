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
        let projects = this.props.state.data.projects;
        return (
            <li>
                <i
                    className={`font-awesome ${category.icon_class}`}
                ></i>
                <article>
                    <h2>{category.name}</h2>
                    <Button
                        text="Edit Category"
                        click={this.editCategory}
                    />
                    <Button
                        text="Delete Category"
                        click={this.deleteCategory}
                        type="danger"
                    />
                    <p>
                        <b>Base URL:</b> {category.base_url}
                    </p>
                    <p>
                        <b>Description:</b> {category.description}
                    </p>
                    <ol>
                        {category.projects.map((project, i) => (
                            <li key={'projects-' + i}>
                                {projects[project].name}
                            </li>
                        ))}
                    </ol>
                </article>
            </li>
        );
    }
}

export default CategoryListItem;
