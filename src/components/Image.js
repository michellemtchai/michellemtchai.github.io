import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import noImage from '../images/no-image.svg';

const Image = ({ src, alt, className, onClick, userPlaceHolder = false }) => {
    if (src) {
        return (
            <GatsbyImage
                className={className}
                image={getImage(src)}
                alt={alt}
                onClick={onClick}
                role={onClick ? 'button' : ''}
            />
        );
    } else {
        return (
            userPlaceHolder && (
                <img
                    className={className}
                    src={noImage}
                    alt={alt}
                    onClick={onClick}
                    role={onClick ? 'button' : ''}
                    style={{ background: '#ccc' }}
                />
            )
        );
    }
};

export default Image;
