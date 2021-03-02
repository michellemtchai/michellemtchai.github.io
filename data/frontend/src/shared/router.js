import { createBrowserHistory } from 'history';
export const history = createBrowserHistory({basename: '/'});

export const goToPage = (link)=>{
    history.push(link);
}
