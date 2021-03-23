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
        this.setState({
            ...this.state,
            width: wrapper.scrollWidth,
            height: window.innerHeight,
            image: {
                width: image.naturalWidth,
                height: image.naturalHeight,
            },
            caption: caption.scrollHeight,
        });
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
        let [captionHeight] = getDimensions(this.state);
        return (
            <section className="image-modal">
                <Button
                    text="◀"
                    disabled={this.state.index === 0}
                    click={() => this.changeImage(-1)}
                />
                <span className="image-holder">
                    <Image
                        reference={this.image}
                        src={image ? image.url : ''}
                        width="100%"
                        height="100%"
                    />
                    <caption
                        ref={this.caption}
                        style={{
                            maxHeight: captionHeight + 'px',
                        }}
                    >
                        {image ? image.caption : ''}
                    </caption>
                </span>
                <Button
                    text="▶"
                    disabled={
                        this.state.index + 1 >=
                        this.props.gallery.length
                    }
                    click={() => this.changeImage(1)}
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
    let captionHeight = bufferHeight - image.height;
    if (captionHeight >= 40) {
        console.log('fits', captionHeight);
    } else {
        console.log('too large', captionHeight);
        captionHeight = 40;
    }
    console.log('caption height:', state.caption);
    return [captionHeight];
};
