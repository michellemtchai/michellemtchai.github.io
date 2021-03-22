import { createBrowserHistory } from 'history';
import { matchPath } from 'react-router';

export const history = createBrowserHistory({ basename: '/' });

export const goToPage = (link) => {
    window.scrollTo(0, 0);
    history.push(link);
};
