import { useEffect } from 'react';
import { navigate } from 'gatsby';

const Redirect = ({ pageContext }) => {
    const { url } = pageContext;
    useEffect(() => {
        navigate(url);
    }, [url]);
    return null;
};

export default Redirect;
