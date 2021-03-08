import css from './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './shared/history';

import { configureStore } from './store';
import { Container } from './shared/map';
import * as jsonData from './config/data.json';
import * as serviceWorker from './serviceWorker';

const store = configureStore(thunk);
const data = {
    state: jsonData.default,
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <React.Suspense fallback={<div>...loading</div>}>
                    <Container {...data} />
                </React.Suspense>
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
