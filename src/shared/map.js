import App from '../config/app';
import { connect } from 'react-redux';
import * as search from '../actions/search';
import * as routes from '../actions/routes';

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        ...search.map(dispatch),
        ...routes.map(dispatch),
    };
};
export const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
