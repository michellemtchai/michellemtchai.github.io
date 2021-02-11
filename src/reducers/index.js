import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { projects } from './projects';

export default combineReducers({
    projects: projects,
});
