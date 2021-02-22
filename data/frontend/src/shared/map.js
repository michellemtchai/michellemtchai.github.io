import App from '../config/app';
import { connect } from 'react-redux';
import * as state from '../actions/state';

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    ...state.map(dispatch),
  };
};
export const Container = connect(mapStateToProps, mapDispatchToProps)(App);