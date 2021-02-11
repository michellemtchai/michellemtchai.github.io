import css from './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { configureStore } from './store';
import { Container } from './shared/map';

const store = configureStore(thunk);

ReactDOM.render(
    <React.StrictMode>
    	<Provider store={store}>
  		    <Container />
	    </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
