import './index.css';
import React, { lazy } from 'react';
const Image = lazy(() => import('../../image/Image'));
const Modal = lazy(() => import('../../modal/Modal'));
const ImageModal = lazy(() => import('./imageModal/ImageModal'));

const noPic = "There's no picture in this gallery.";
const openPic = 'Click to see image.';

class Gallery extends React.Component {
    state = {
        open: false,
        index: 0,
    };
    images = [];
    updateShow = (value) => {
        this.setState({
            ...this.state,
            open: value,
        });
    };
    changeImage = (increment) => {
        this.setState({
            ...this.state,
            index: this.state.index + increment,
        });
    };
    openModal = (index) => {
        this.setState({
            index: index,
            open: true,
        });
    };
    closeModal = () => {
        this.updateShow(false);
    };
    componentWillUnmount() {
        this.images = [];
    }
    componentDidMount() {
        this.images = [];
        this.props.gallery.forEach((i) =>
            this.images.push(React.createRef())
        );
    }
    render() {
        return (
            <section className="gallery">
                <Modal
                    show={this.state.open}
                    updateShow={this.updateShow}
                >
                    <ImageModal
                        gallery={this.props.gallery}
                        index={this.state.index}
                        update={this.changeImage}
                        imageRefs={this.images}
                    />
                </Modal>
                {this.props.gallery.length > 0 ? (
                    <section className="thumbnails">
                        {this.props.gallery.map((entry, i) => (
                            <Image
                                reference={this.images[i]}
                                key={'gallery-image-' + i}
                                src={entry.url}
                                alt={openPic}
                                onClick={() => this.openModal(i)}
                            />
                        ))}
                    </section>
                ) : (
                    <p className="no-pic">{noPic}</p>
                )}
            </section>
        );
    }
}

export default Gallery;
