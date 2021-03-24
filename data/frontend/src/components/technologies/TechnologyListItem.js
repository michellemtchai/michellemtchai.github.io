import React from 'react';
import Image from '../image/Image';
import Button from '../form/buttons/Button';
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
        let useCount = this.props.techUseMap[technology._id]
            ? this.props.techUseMap[technology._id]
            : 0;
        return (
            <li>
                <Image
                    src={technology.icon_url}
                    alt={technology.name}
                    width="100px"
                    height="100px"
                />
                <article>
                    <h2>
                        {technology.name} ({useCount})
                    </h2>
                    <p>
                        <b>Source:</b> {technology.source_url}
                    </p>
                    <Button
                        text="Edit Technology"
                        click={this.editTechnology}
                    />
                    <Button
                        text="Delete Technology"
                        click={this.deleteTechnology}
                        type="danger"
                    />
                </article>
            </li>
        );
    }
}

export default TechnologyListItem;
