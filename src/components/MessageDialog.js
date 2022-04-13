import React from 'react';
import Button from './Button';
import Image from './Image';
import * as styles from './MessageDialog.module.scss';

const openInNewTab = (url, update) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
    update(false);
};

const MessageDialog = ({ link, update, title, image, message }) => {
    return (
        <dialog open className={styles.dialog}>
            <Image src={image} alt={title} />
            <p>{message}</p>
            <Button
                className={styles.goBackButton}
                onClick={() => update(false)}
            >
                Go Back
            </Button>
            <Button
                className={styles.proceedButton}
                onClick={() => openInNewTab(link, update)}
            >
                Proceed
            </Button>
        </dialog>
    );
};

export default MessageDialog;
