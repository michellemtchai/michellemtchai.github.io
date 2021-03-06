import './index.css';
import React, { lazy } from 'react';
const Image = lazy(() => import('../../../image/Image'));
const Button = lazy(() => import('./Button'));

class ImageModal extends React.Component {
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

    nextImage = () => {
        if (this.state.index + 1 < this.props.gallery.length) {
            this.changeImage(1);
        } else {
            this.changeImage(-(this.props.gallery.length - 1));
        }
    };

    updateDimensions = () => {
        let caption = this.caption.current;
        let image = this.props.imageRefs[this.state.index]
            .current;
        if (caption && image) {
            this.setState({
                ...this.state,
                width: divWidth(window.innerWidth),
                height: window.innerHeight,
                image: {
                    width:
                        image.naturalWidth === 0
                            ? 430
                            : image.naturalWidth,
                    height:
                        image.naturalHeight === 0
                            ? 314
                            : image.naturalHeight,
                },
                caption: caption.scrollHeight + 15,
            });
        }
    };
    keyControl = (event) => {
        switch (event.keyCode) {
            case 37:
                if (this.state.index > 0) {
                    this.changeImage(-1);
                }
                break;
            case 39:
                if (
                    this.state.index + 1 <
                    this.props.gallery.length
                ) {
                    this.changeImage(1);
                }
                break;
        }
    };
    componentWillUnmount() {
        window.removeEventListener(
            'resize',
            this.updateDimensions
        );
        document.removeEventListener(
            'keydown',
            this.keyControl,
            false
        );
    }
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
        document.addEventListener(
            'keydown',
            this.keyControl,
            false
        );
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
                    text="???"
                    disabled={this.state.index === 0}
                    onClick={() => this.changeImage(-1)}
                    style={buttonStyle}
                />
                <figure className="image-holder">
                    <Image
                        src={image ? image.url : ''}
                        width="100%"
                        height="100%"
                        onClick={this.nextImage}
                        alt="Next Image"
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
                    text="???"
                    disabled={
                        this.state.index + 1 >=
                        this.props.gallery.length
                    }
                    onClick={() => this.changeImage(1)}
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
        width: state.width - 100,
        height: aspectRatio * (state.width - 100),
    };
    let captionHeight,
        imageStyle = {},
        buttonStyle = {};
    let maxHeight = bufferHeight - image.height;
    let groupedHeight = image.height + state.caption;
    if (groupedHeight <= bufferHeight || maxHeight > 40) {
        captionHeight =
            state.caption < maxHeight
                ? state.caption
                : maxHeight;
        groupedHeight = image.height + captionHeight;
        imageStyle.width = image.width;
        imageStyle.height = groupedHeight;
    } else {
        let height = bufferHeight - 40;
        imageStyle.height = `${height}px`;
        imageStyle.width = `${height / aspectRatio}px`;
        groupedHeight = bufferHeight;
        captionHeight = 40;
    }
    imageStyle.marginTop = `${
        (state.height - groupedHeight) / 2
    }px`;
    buttonStyle.marginTop = `${groupedHeight / 2 - 50}px`;
    return [captionHeight, imageStyle, buttonStyle];
};

const divWidth = (screenWidth) => {
    if (screenWidth <= 800) {
        return screenWidth * 0.95;
    } else if (screenWidth <= 900) {
        return screenWidth * 0.9;
    } else if (screenWidth <= 1000) {
        return screenWidth * 0.85;
    } else if (screenWidth <= 1100) {
        return screenWidth * 0.8;
    } else if (screenWidth <= 1143) {
        return screenWidth * 0.75;
    } else if (screenWidth <= 1200) {
        return screenWidth * 0.7;
    } else {
        return 1200;
    }
};
