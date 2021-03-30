import './index.css';
import React from 'react';
import Image from '../../../image/Image';
import Button from '../../../form/buttons/Button';

class ImageModal extends React.Component {
    image = React.createRef();
    caption = React.createRef();
    state = {
        index: this.props.index,
        image: {
            width: 0,
            height: 0,
        },
        caption: 0,
        width: 0,
        height: window.innerHeight,
        resized: 0,
    };
    changeImage = (increment) => {
        this.setState(
            {
                ...this.state,
                index: this.state.index + increment,
            },
            () => {
                this.updateDimensions();
                this.props.update(increment);
            }
        );
    };

    updateDimensions = () => {
        let wrapper = this.image.current;
        let caption = this.caption.current;
        let image = this.props.imageRefs[this.state.index]
            .current;
        this.setState(
            {
                ...this.state,
                width: wrapper.scrollWidth,
                height: window.innerHeight,
                image: {
                    width: image.naturalWidth,
                    height: image.naturalHeight,
                },
                caption: caption.scrollHeight + 20,
                resized: this.state.resized + 1,
            },
            () => console.log(this.state.resized)
        );
    };
    componentWillUnmount() {
        window.removeEventListener(
            'resize',
            this.updateDimensions
        );
    }
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }
    render() {
        let image = this.props.gallery[this.state.index];
        let [
            captionHeight,
            imageStyle,
            buttonStyle,
        ] = getDimensions(this.state);
        return (
            <section className="image-modal" style={imageStyle}>
                <Button
                    text="◀"
                    disabled={this.state.index === 0}
                    click={() => this.changeImage(-1)}
                    style={buttonStyle}
                />
                <figure className="image-holder">
                    <Image
                        reference={this.image}
                        src={image ? image.url : ''}
                        width="100%"
                        height="100%"
                    />
                    <figcaption
                        ref={this.caption}
                        style={{
                            maxHeight: captionHeight + 'px',
                        }}
                    >
                        {image ? image.caption : ''}
                    </figcaption>
                </figure>
                <Button
                    text="▶"
                    disabled={
                        this.state.index + 1 >=
                        this.props.gallery.length
                    }
                    click={() => this.changeImage(1)}
                    style={buttonStyle}
                />
            </section>
        );
    }
}

export default ImageModal;

const getDimensions = (state) => {
    let bufferHeight = state.height - 40;
    let aspectRatio = state.image.height / state.image.width;
    let image = {
        width: state.width,
        height: aspectRatio * state.width,
    };
    let captionHeight,
        imageStyle = {},
        buttonStyle = {};
    let maxHeight = bufferHeight - image.height;
    let groupedHeight = image.height + state.caption;
    if (groupedHeight <= bufferHeight || maxHeight > 40) {
        captionHeight =
            state.caption <= maxHeight
                ? state.caption
                : maxHeight;
        groupedHeight = image.height + captionHeight;
        imageStyle.marginTop = `${
            (state.height - groupedHeight) / 2
        }px`;
    } else {
        let height = bufferHeight - 40;
        imageStyle.height = `${height}px`;
        imageStyle.width = `${height / aspectRatio}px`;
        imageStyle.marginTop = '20px';
        groupedHeight = bufferHeight;
        captionHeight = 40;
    }
    buttonStyle.marginTop = `${groupedHeight / 2 - 50}px`;
    return [captionHeight, imageStyle, buttonStyle];
};
