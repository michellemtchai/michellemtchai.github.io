import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../shared/router';
import { search } from './search';
import { routes } from './routes';
import { projects } from './projects';

export default combineReducers({
    search: search,
    routes: routes,
    projects: projects,
    router: connectRouter(history),
});
