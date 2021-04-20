import App from '../config/app';
import { connect } from 'react-redux';
import * as search from '../actions/search';
import * as routes from '../actions/routes';
import * as projects from '../actions/projects';
import * as state from '../actions/state';

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        ...search.map(dispatch),
        ...routes.map(dispatch),
        ...projects.map(dispatch),
        ...state.map(dispatch),
    };
};
export const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
