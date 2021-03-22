import './index.css';
import React from 'react';
import Image from '../../image/Image';

class Gallery extends React.Component {
    render() {
        let noPic = "There's no picture in this gallery.";
        return (
            <section className="gallery">
                {this.props.gallery.length > 0 ? (
                    <>
                        {this.props.gallery.map((entry, i) => (
                            <Image
                                src={entry.url}
                                alt={entry.caption}
                            />
                        ))}
                    </>
                ) : (
                    <p>{noPic}</p>
                )}
            </section>
        );
    }
}

export default Gallery;
