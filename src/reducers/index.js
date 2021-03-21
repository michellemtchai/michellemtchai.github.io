import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../shared/router';

export default combineReducers({
    router: connectRouter(history),
});
