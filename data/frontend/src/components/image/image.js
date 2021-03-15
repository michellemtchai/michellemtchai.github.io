import './index.css';
import React from 'react';
import noImageSvg from './no-image.svg';

class Image extends React.Component {
    state = {
        errored: false,
    };
    onError = () => {
        if (!this.state.errored) {
            this.setState({
                errored: true,
            });
        }
    };
    style = {
        width: this.props.width ? `${this.props.width}px` : '200px',
        height: this.props.height ? `${this.props.height}px` : '145px',
    };
    render() {
        let src = this.props.src === 'null' ? noImageSvg : this.props.src;
        return !this.state.errored ? (
            <img
                className="image"
                src={src}
                onError={this.onError}
                alt={this.props.alt}
                title={this.props.alt}
                style={this.style}
            />
        ) : (
            <article className="image" style={this.style}>
                <h3>Broken Image</h3>
                <p>{this.props.alt}</p>
            </article>
        );
    }
}

export default Image;
