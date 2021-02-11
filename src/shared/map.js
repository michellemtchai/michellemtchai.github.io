import App from '../pages/app';
import { connect } from 'react-redux';
import * as projects from '../actions/projects';

const mapStateToProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    ...projects.map(dispatch),
  };
};
export const Container = connect(mapStateToProps, mapDispatchToProps)(App);