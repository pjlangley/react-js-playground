import React from 'react';
import LocationInfo from './location-info';
import Warning from './warning';
import { fetchLocationAsync } from '../modules/thunks';

class Location extends React.Component {
    render() {
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
                            <a href="#" onClick={this.onRefresh.bind(this)}>Refresh</a>
                            <img className={state.isLoading ? 'loader' : 'loader hide'} src="images/spinner.gif" alt="Loading location"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getLocation();
    }

    onRefresh(e) {
        e.preventDefault();
        this.getLocation();
    }

    getLocation() {
        this.context.store.dispatch(
            fetchLocationAsync(this.props.locationId)
        );
    }
}

Location.contextTypes = {
    store: React.PropTypes.object
};

export default Location;
