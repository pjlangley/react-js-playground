import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import locationReducer from './reducers/location';
import Location from './components/location';

var store = createStore(locationReducer);

var render = function() {
    ReactDOM.render(
        <Provider store={store}>
            <Location locationId="353500"/>
        </Provider>,
        document.getElementById('app')
    );
};

store.subscribe(render);
render();
