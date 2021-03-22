import React from 'react';
import TextField from '../text/TextField';
import ImageField from '../image/ImageField';
import ActionButtons from '../buttons/ActionButtons';

class GalleryImageField extends React.Component {
    state = {
        error: '',
        value: {
            url: '',
            caption: '',
        },
    };
    handleChange = (value, key) => {
        this.setState({
            ...this.state,
            value: {
                ...this.state.value,
                [key]: value,
            },
        });
    };
    save = () => {
        let value = this.state.value;
        if (value.url.length > 0 && value.caption.length > 0) {
            this.props.update(value);
        } else {
            this.setState({
                ...this.state,
                error: 'Error: both value must not be empty',
            });
        }
    };
    render() {
        return (
            <section className="modal-dialog">
                {this.state.error ? (
                    <p className="error">{this.state.error}</p>
                ) : (
                    ''
                )}
                <ImageField
                    {...imageProps(
                        this.props,
                        this.state.value.url
                    )}
                    update={(i) => this.handleChange(i, 'url')}
                />
                <TextField
                    {...textProps(
                        this.props,
                        this.state.value.caption
                    )}
                    update={(i) =>
                        this.handleChange(i, 'caption')
                    }
                />
                <ActionButtons
                    text="Use Image"
                    save={this.save}
                    cancel={this.props.close}
                />
            </section>
        );
    }
}

export default GalleryImageField;

const imageProps = (props, value) => {
    return {
        label: 'Image',
        id: `${props.name}-image-${props.type}`,
        name: `${props.name}-image`,
        value: value,
        transparent: props.transparent,
        scale: props.scale,
        width: props.width,
        height: props.height,
        maxSize: props.maxSize,
        resolution: props.resolution,
    };
};

export const textProps = (props, value) => {
    return {
        label: 'Image Caption',
        id: `${props.name}-image-caption-${props.type}`,
        name: `${props.name}-image-caption`,
        placeholder: 'Enter image caption',
        value: value,
    };
};
