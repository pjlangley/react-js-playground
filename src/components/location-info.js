import React from 'react';
import { isDegreesC } from '../modules/validate';

var LocationInfo = React.createClass({
    createDegreesMarkup: function(string) {
        return {
            __html: isDegreesC(string) ? string : ''
        };
    },

    render: function() {
        var props = this.props;
        var info = props.info;

        return (
            <ul className="location-info">
                <li className="id"><strong>Location ID: </strong>{info.id}</li>
                <li className="lon"><strong>Lon: </strong>{info.lon}</li>
                <li className="lat"><strong>Lat: </strong>{info.lat}</li>
                <li className="country"><strong>Country: </strong>{info.country}</li>
                <li className="continent"><strong>Continent: </strong>{info.continent}</li>
                <li className="temperature"><strong>Temperature: </strong><span dangerouslySetInnerHTML={this.createDegreesMarkup(info.temperature)}/></li>
                <li className="wind-speed"><strong>Wind Speed: </strong>{info.windSpeed}</li>
                <li className="wind-direction"><strong>Wind Direction: </strong>{info.windDirection}</li>
                <li className="right-align">Last updated: {new Date(props.lastUpdated).toLocaleString()}</li>
            </ul>
        );
    }
});

export default LocationInfo;
