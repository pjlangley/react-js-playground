export function fetchLocation() {
    return {
        type: 'FETCH_LOCATION'
    };
}

export function receiveLocation(payload) {
    if (payload instanceof Error) {
        return {
            type: 'RECEIVE_LOCATION',
            payload: payload,
            error: true
        }
    }

    return {
        type: 'RECEIVE_LOCATION',
        payload: payload,
        meta: {
            timestamp: new Date().getTime()
        },
        error: null
    }
}

export { fetchLocation, receiveLocation };
