import React from 'react';
import Button from '../form/buttons/Button';
import { goToPage } from '../../shared/router';
import { deleteItem } from '../../shared/pages';

class TagListItem extends React.Component {
    deleteTag = () => {
        deleteItem(
            this.props,
            'tag',
            api.removeTagById,
            '/tags'
        );
    };
    render() {
        let tag = this.props.tag;
        let useCount = this.props.tagUseMap[tag._id]
            ? this.props.tagUseMap[tag._id]
            : 0;
        return (
            <li>
                <p
                    style={{
                        width: 'calc(100% - 100px)',
                        display: 'inline-block',
                    }}
                >
                    <b>{tag.name}</b> ({useCount})
                </p>
                {useCount == 0 ? (
                    <Button
                        text="Delete Tag"
                        click={this.deleteTag}
                        type="danger"
                        style={{ float: 'right' }}
                    />
                ) : (
                    ''
                )}{' '}
            </li>
        );
    }
}

export default TagListItem;
