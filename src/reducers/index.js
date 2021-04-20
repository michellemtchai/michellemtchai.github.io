import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../shared/router';
import { search } from './search';
import { routes } from './routes';
import { projects } from './projects';
import { state } from './state';

export default combineReducers({
    search: search,
    routes: routes,
    projects: projects,
    state: state,
    router: connectRouter(history),
});
