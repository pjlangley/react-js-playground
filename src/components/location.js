import React from 'react';
import fetch from '../modules/fetch-location';
import LocationInfo from './location-info';
import Warning from './warning';
import { fetchLocation, receiveLocation } from '../modules/actions';

var Location = React.createClass({
    render: function() {
        var state = this.context.store.getState();

        return (
            <div className="row">
                <div className="col s12 offset-m2 m8">
                    <div className="card large">
                        <div className="card-image">
                            <img src="images/background.jpg"/>
                            <span className="card-title">{state.locationInfo ? state.locationInfo.name : ''}</span>
                        </div>
                        <div className="card-content">
                            {state.unavailable ? <Warning text="Sorry, we were unable to get the location information at this time. Please try again later."/> : ''}

                            {state.locationInfo ? <LocationInfo/> : ''}
                        </div>
                        <div className="card-action">
                            <a href="#" onClick={this.onRefresh}>Refresh</a>
                            <img className={state.isLoading ? 'loader' : 'loader hide'} src="images/spinner.gif" alt="Loading location"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        this.getLocation();
    },

    onRefresh: function(e) {
        e.preventDefault();

        if (this.context.store.getState().isLoading) return;

        this.getLocation();
    },

    getLocation: function() {
        this.context.store.dispatch(fetchLocation());

        var result = fetch(this.props.locationId);

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

            this.context.store.dispatch(receiveLocation(payload));

        }.bind(this), function onFail(jqXHR, textStatus, errorThrown) {
            this.context.store.dispatch(receiveLocation(new Error()));
        }.bind(this));
    }
});

Location.contextTypes = {
    store: React.PropTypes.object
};

export default Location;
