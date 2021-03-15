import { createBrowserHistory } from 'history';
import { matchPath } from 'react-router';

export const history = createBrowserHistory({ basename: '/' });

export const goToPage = (props, link) => {
    props.setData({
        form: null,
    });
    history.push(link);
};
