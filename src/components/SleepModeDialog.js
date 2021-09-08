import React from 'react';
import Button from './Button';
import Image from './Image';
import sleepMode from '../images/sleep.svg';
import * as styles from './SleepModeDialog.module.scss';

const sleepModeMessage =
    'This project will need time to wake up from sleep mode. Are you sure you want to proceed?';

const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
};

const SleepModeDialog = ({ link, update }) => {
    return (
        <dialog open className={styles.dialog}>
            <Image src={sleepMode} alt="Sleep Mode" />
            <p>{sleepModeMessage}</p>
            <Button
                className={styles.goBackButton}
                onClick={() => update(false)}
            >
                Go Back
            </Button>
            <Button
                className={styles.proceedButton}
                onClick={() => openInNewTab(link)}
            >
                Proceed
            </Button>
        </dialog>
    );
};

export default SleepModeDialog;
