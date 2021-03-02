import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../shared/router';
import { state } from './state';

export default combineReducers({
    state: state,
    router: connectRouter(history)
});
