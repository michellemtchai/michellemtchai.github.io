import React, { useState, useEffect } from 'react';
import Button from './Button';
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
            <img src={sleepMode} title="Sleep Mode" />
            <p>{sleepModeMessage}</p>
            <button onClick={() => update(false)}>Go Back</button>
            <button onClick={() => openInNewTab(link)}>Proceed</button>
        </dialog>
    );
};

export default SleepModeDialog;
