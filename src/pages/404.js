import React, { useEffect, useContext } from 'react';
import SearchBar from '../components/SearchBar';
import NotFoundMessage from '../components/NotFoundMessage';
import { GlobalContext } from '../../GlobalContext.js';

const NotFound = ({ data }) => {
    const { setTitle, setDescription } = useContext(GlobalContext);
    useEffect(() => {
        setTitle('Page Not Found');
        setDescription("There's no such page.");
    }, []);
    return (
        <>
            <SearchBar />
            <NotFoundMessage />
        </>
    );
};

export default NotFound;
