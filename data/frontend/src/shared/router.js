import { createBrowserHistory } from 'history';
import { matchPath } from "react-router";

export const history = createBrowserHistory({basename: '/'});

export const goToPage = (link)=>{
    history.push(link);
}
