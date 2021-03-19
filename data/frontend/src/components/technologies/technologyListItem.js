import React from 'react';
import Image from '../image/image';
import Button from '../form/button';
import { editItem, deleteItem } from '../../shared/pages';
import { api } from '../../config/api';

class TechnologyListItem extends React.Component {
    editTechnology = () => {
        editItem(this.props, '/technologies', 'technology');
    };
    deleteTechnology = () => {
        deleteItem(
            this.props,
            'technology',
            api.removeTechnologyById,
            '/technologies'
        );
    };
    render() {
        let technology = this.props.technology;
        return (
            <li>
                <Image
                    src={technology.icon_url}
                    alt={technology.name}
                />
                <article>
                    <h2>{technology.name}</h2>
                    <Button
                        text="Edit Technology"
                        click={this.editTechnology}
                    />
                    <Button
                        text="Delete Technology"
                        click={this.deleteTechnology}
                        type="danger"
                    />
                    <p>Source: {technology.source_url}</p>
                </article>
            </li>
        );
    }
}

export default TechnologyListItem;
