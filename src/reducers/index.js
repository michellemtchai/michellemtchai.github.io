import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../shared/router';
import { search } from './search';
import { routes } from './routes';

export default combineReducers({
    search: search,
    routes: routes,
    router: connectRouter(history),
});
