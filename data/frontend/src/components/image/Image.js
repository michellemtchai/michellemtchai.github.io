import React from 'react';
import noImageSvg from './no-image.svg';
import brokenSvg from './broken-image.svg';

class Image extends React.Component {
    state = {
        errored: false,
        style: style(this.props, false),
        alt: this.props.alt,
    };
    onError = () => {
        let alt = this.props.alt ? this.props.alt : '';
        this.setState({
            errored: true,
            style: style(this.props, true),
            alt:
                alt.length > 0
                    ? 'Broken Image - ' + alt
                    : 'Broken Image',
        });
    };

    src = () => {
        if (this.state.errored) {
            return brokenSvg;
        } else {
            return this.props.src === ''
                ? noImageSvg
                : this.props.src;
        }
    };
    componentDidUpdate(prevProps) {
        if (prevProps.src !== this.props.src) {
            this.setState({
                errored: false,
                style: style(this.props, false),
                alt: this.props.alt,
            });
        }
    }
    render() {
        return (
            <img
                ref={this.props.reference}
                className="image"
                src={this.src()}
                onError={this.onError}
                onClick={this.props.onClick}
                alt={this.state.alt}
                title={this.state.alt}
                style={this.state.style}
            />
        );
    }
}

export default Image;

const background = (props, error) => {
    if (error) {
        return '#ccc';
    } else {
        return props.src === '' ? '#ccc' : 'none';
    }
};

const style = (props, error) => {
    return {
        width: props.width ? props.width : '200px',
        height: props.height ? props.height : '150px',
        background: background(props, error),
        cursor: props.onClick ? 'pointer' : 'default',
    };
};
