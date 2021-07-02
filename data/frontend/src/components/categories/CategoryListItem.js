import React from 'react';
import Button from '../form/buttons/Button';
import { goToPage } from '../../shared/router';
import { editItem, deleteItem } from '../../shared/pages';

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
    click = (event, project) => {
        event.preventDefault();
        goToPage(`/projects/${project}`);
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
                        <b>Description:</b>{' '}
                        {category.description}
                    </p>
                    <ol>
                        {category.projects.map((project, i) => (
                            <li key={'projects-' + i}>
                                <a
                                    href={`/projects/${project}`}
                                    onClick={(e) =>
                                        this.click(e, project)
                                    }
                                >
                                    {projects[project].name}
                                </a>
                            </li>
                        ))}
                    </ol>
                </article>
            </li>
        );
    }
}

export default CategoryListItem;
