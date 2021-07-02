import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../shared/router';
import { state } from './state';
import { routes } from './routes';

export default combineReducers({
    state: state,
    routes: routes,
    router: connectRouter(history),
});
