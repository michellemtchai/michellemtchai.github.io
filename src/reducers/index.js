import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../shared/router';
import { results } from './results';
import { routes } from './routes';
import { projects } from './projects';
import { state } from './state';

export default combineReducers({
    results: results,
    routes: routes,
    projects: projects,
    state: state,
    router: connectRouter(history),
});
