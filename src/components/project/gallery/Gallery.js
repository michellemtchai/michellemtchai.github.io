import React from 'react';

class Gallery extends React.Component {
    render() {
        let noPic = "There's no picture in this gallery.";
        return (
            <section className="gallery">
                {this.props.gallery.length > 0 ? (
                    <p>gallery</p>
                ) : (
                    <p>{noPic}</p>
                )}
            </section>
        );
    }
}

export default Gallery;
