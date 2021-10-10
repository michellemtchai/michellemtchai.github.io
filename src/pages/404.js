import React from 'react';
import SearchBar from '../components/SearchBar';
import NotFoundMessage from '../components/NotFoundMessage';

const NotFound = ({ data }) => {
    // title="Page Not Found" description="There's no such page."
    return (
        <>
            <SearchBar />
            <NotFoundMessage />
        </>
    );
};

export default NotFound;
