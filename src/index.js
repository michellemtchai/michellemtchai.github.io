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

const store = configureStore(thunk);
const data = {
    state: jsonData.default
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Container {...data}/>
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
