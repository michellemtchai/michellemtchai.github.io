import { useState, useEffect } from 'react';

const noAction = () => {
    console.log('No action included with keypress');
};

export const useKeyPress = (targetKey, action = noAction) => {
    const [keyPressed, setKeyPressed] = useState(false);
    const downHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    };
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);
    useEffect(() => {
        if (keyPressed) {
            action();
        }
    }, [keyPressed]);
};
