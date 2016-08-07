import { expect } from 'chai';
import locationReducer from '../../src/reducers/location';
import { fetchLocation, receiveLocation } from '../../src/modules/actions';

describe('`location` reducer unit tests', function() {
    describe('given the initial `undefined` state', function() {
        it('returns an empty object for the state', function() {
            expect(
                locationReducer(undefined, {})
            ).to.eql({});
        });
    });

    describe('given an unrecognised action type', function() {
        it('returns an unchanged state', function() {
            var state = Object.freeze({isLoading: true});

            expect(
                locationReducer(state, {})
            ).to.eql(state);
        });
    });

    describe('`FETCH_LOCATION` action', function() {
        it('upon initial fetch, it returns the correct state', function() {
            var stateBefore = Object.freeze({});
            var stateAfter = {
                isLoading: true,
                unavailable: false
            };

            expect(locationReducer(stateBefore, fetchLocation())).to.eql(stateAfter);
        });

        it('when fetching on a refresh, it returns the correct state', function() {
            var stateBefore = Object.freeze({
                isLoading: false,
                unavailable: true
            });
            var stateAfter = {
                isLoading: true,
                unavailable: false
            };

            expect(locationReducer(stateBefore, fetchLocation())).to.eql(stateAfter);
        });
    });

    describe('`RECEIVE_LOCATION` action', function() {
        it('returns the correct state when location info has been received', function() {
            var stateBefore = Object.freeze({
                isLoading: true,
                unavailable: false
            });

            var now = new Date().getTime();

            var payload = {
                id: 666
            };

            var stateAfter = locationReducer(stateBefore, receiveLocation(payload));

            expect(stateAfter).to.have.property('isLoading', false);
            expect(stateAfter).to.have.property('unavailable', false);
            expect(stateAfter).to.have.property('lastUpdated');
            expect(stateAfter.lastUpdated).to.be.at.least(now);
            expect(stateAfter).to.have.property('locationInfo');
            expect(stateAfter.locationInfo).to.eql(payload);
        });

        it('returns the correct state after an erroneous RECEIVE_LOCATION action', function() {
            var now = new Date().getTime();

            var stateBefore = Object.freeze({
                isLoading: true,
                unavailable: false,
                lastUpdated: now,
                locationInfo: {
                    id: 666
                }
            });

            var stateAfter = {
                isLoading: false,
                unavailable: true,
                lastUpdated: now,
                locationInfo: {
                    id: 666
                }
            };

            expect(locationReducer(stateBefore, receiveLocation(new Error()))).to.eql(stateAfter);
        });
    });
});
