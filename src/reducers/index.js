import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../shared/history';

export default combineReducers({
    router: connectRouter(history)
});
