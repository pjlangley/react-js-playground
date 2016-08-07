export default function(state, action) {
    'use strict';

    if (typeof state === 'undefined') {
        return {};
    }

    switch(action.type) {
        case 'FETCH_LOCATION':
            return Object.assign({}, state, {
                isLoading: true,
                unavailable: false
            });
            break;

        case 'RECEIVE_LOCATION':
            if (action.error) {
                return Object.assign({}, state, {
                    isLoading: false,
                    unavailable: true
                });
            }
            else {
                return Object.assign({}, state, {
                    isLoading: false,
                    unavailable: false,
                    lastUpdated: action.meta.timestamp,
                    locationInfo: action.payload
                });
            }
            break;
        default:
            return state;
    }
};