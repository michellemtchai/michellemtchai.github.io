import './config/polyfill';
import css from './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './shared/router';

import { configureStore } from './store';
import { Container } from './shared/map';

const store = configureStore(thunk);
const helmetContext = {};

ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider context={helmetContext}>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <React.Suspense
                        fallback={<div>...loading</div>}
                    >
                        <Container />
                    </React.Suspense>
                </ConnectedRouter>
            </Provider>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
