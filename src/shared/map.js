import App from '../config/app';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => ({});
export const Container = connect(mapStateToProps, mapDispatchToProps)(App);
