import { fetchLocation, receiveLocation } from './actions';
import fetch from '../modules/fetch-location';

export function fetchLocationAsync(locationId) {
    return function(dispatch, getState) {
        if (getState().isLoading) return;

        dispatch(fetchLocation());

        setTimeout(function() {
            var result = fetch(locationId);

            result.then(function onResolve(data, textStatus, jqXHR) {
                var location = data.SiteRep.DV.Location;
                var stats = location.Period[0].Rep[0];

                var payload = {
                    id: location.i,
                    name: location.name,
                    lat: location.lat,
                    lon: location.lon,
                    country: location.country,
                    continent: location.continent,
                    temperature: stats.T + '&deg;C',
                    windSpeed: stats.S + 'mph',
                    windDirection: stats.D
                };

                return dispatch(receiveLocation(payload));

            }, function onFail(jqXHR, textStatus, errorThrown) {
                return dispatch(receiveLocation(new Error()));
            });
        }, 1000);
    }
}

export { fetchLocationAsync };
