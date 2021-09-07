import React from 'react';
import Image from './Image';
import * as styles from './PreviewImage.module.scss';

const PreviewImage = ({ src, alt, demo, className }) => {
    const classCombo = className ? `${styles.preview} ${className}` : styles;
    return (
        <figure className={classCombo}>
            {demo && <span>DEMO</span>}
            <Image src={src} alt={alt} userPlaceHolder={true} />
        </figure>
    );
};

export default PreviewImage;
