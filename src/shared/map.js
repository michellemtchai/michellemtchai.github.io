import App from '../config/app';
import { connect } from 'react-redux';
import * as search from '../actions/search';

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        ...search.map(dispatch),
    };
};
export const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
