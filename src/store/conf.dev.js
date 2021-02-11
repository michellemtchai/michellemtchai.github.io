import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';

export const configureStore = (...middlewares)=>{
    const finalCreateStore = compose(
        applyMiddleware(...middlewares),
    )(createStore);
    return finalCreateStore(reducers);
}
