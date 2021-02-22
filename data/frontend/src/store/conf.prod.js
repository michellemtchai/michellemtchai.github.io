import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';

export const configureStore = (...middlewares)=>{
    return applyMiddleware(...middlewares)(createStore)(reducers);
}
