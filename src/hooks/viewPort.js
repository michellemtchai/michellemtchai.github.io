import { useState, useEffect } from 'react';

export const useViewPort = (action) => {
    const [viewPortSize, setViewPortSize] = useState({
        width: undefined,
        height: undefined,
    });
    const handleResize = () => {
        const vw = Math.max(
            document.documentElement.clientWidth || 0,
            window.innerWidth || 0
        );
        const vh = Math.max(
            document.documentElement.clientHeight || 0,
            window.innerHeight || 0
        );
        setViewPortSize({
            width: vw,
            height: vh,
        });
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        action(viewPortSize);
    }, [viewPortSize]);
};
