import React from 'react';
import Image from '../../image/Image';
import TextField from '../text/TextField';
import Button from '../buttons/Button';
import { textProps } from './GalleryImageField';

class GalleryImageList extends React.Component {
    state = {
        value: this.props.value,
    };
    removeImage = (index) => {
        let images = [...this.state.value];
        images.splice(index, 1);
        this.setState(
            {
                value: images,
            },
            () => this.props.update(this.state.value)
        );
    };
    swap = (index, diff) => {
        let images = [...this.state.value];
        let temp = images[index + diff];
        images[index + diff] = images[index];
        images[index] = temp;
        this.setState(
            {
                value: images,
            },
            () => this.props.update(this.state.value)
        );
    };
    update = (index, value) => {
        let images = [...this.state.value];
        images[index].caption = value;
        this.setState(
            {
                value: images,
            },
            () => this.props.update(this.state.value)
        );
    };
    componentDidUpdate(prevProps) {
        if (prevProps.value != this.props.value) {
            this.setState(
                {
                    value: this.props.value,
                },
                () => this.props.update(this.state.value)
            );
        }
    }
    render() {
        return this.state.value.length > 0 ? (
            <ul className="gallery-list">
                {this.state.value.map((entry, i) => (
                    <li key={'gallery-list-' + i}>
                        <Image
                            src={entry.url}
                            alt={'image-' + i}
                        />
                        <section className="row-1">
                            <Button
                                text="▲"
                                disabled={i === 0}
                                click={() => this.swap(i, -1)}
                            />
                        </section>
                        <TextField
                            {...textProps(
                                this.props,
                                entry.caption
                            )}
                            update={(value) =>
                                this.update(i, value)
                            }
                        />
                        <section className="row-2">
                            <Button
                                className="delete-button"
                                text="Delete Image"
                                type="danger"
                                click={() => this.removeImage(i)}
                            />
                            <Button
                                text="▼"
                                disabled={
                                    i + 1 >=
                                    this.state.value.length
                                }
                                click={() => this.swap(i, 1)}
                            />
                        </section>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="gallery-list">No Image</p>
        );
    }
}

export default GalleryImageList;
