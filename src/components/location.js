import React from 'react';
import { connect } from 'react-redux';
import LocationInfo from './location-info';
import Warning from './warning';
import { fetchLocationAsync } from '../modules/thunks';

function mapStateToProps(state) {
    return {
        locationInfo: state.locationInfo,
        unavailable: state.unavailable,
        isLoading: state.isLoading,
        lastUpdated: state.lastUpdated
    };
}

class Location extends React.Component {
    constructor() {
        super();
        this.onRefresh = this.onRefresh.bind(this);
    }

    render() {
        var props = this.props;

        return (
            <div className="row">
                <div className="col s12 offset-m2 m8">
                    <div className="card large">
                        <div className="card-image">
                            <img src="images/background.jpg"/>
                            <span className="card-title">{props.locationInfo ? props.locationInfo.name : ''}</span>
                        </div>
                        <div className="card-content">
                            {props.unavailable ? <Warning text="Sorry, we were unable to get the location information at this time. Please try again later."/> : ''}

                            {props.locationInfo ? <LocationInfo info={props.locationInfo} lastUpdated={props.lastUpdated}/> : ''}
                        </div>
                        <div className="card-action">
                            <a href="#" onClick={this.onRefresh}>Refresh</a>
                            <img className={props.isLoading ? 'loader' : 'loader hide'} src="images/spinner.gif" alt="Loading location"/>
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
        this.props.dispatch(
            fetchLocationAsync(this.props.params.locationId || 353500)
        );
    }
}

export default connect(mapStateToProps)(Location);
