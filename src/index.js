import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import locationReducer from './reducers/location';
import Location from './components/location';

var store = createStore(
    locationReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/(:locationId)" component={Location}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
