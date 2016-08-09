import { fetchLocationAsync } from '../../src/modules/thunks';
import { fetchLocation, receiveLocation } from '../../src/modules/actions';
import thunk from 'redux-thunk';

import sinon from 'sinon';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';

var mockStore = configureMockStore([thunk]);
var store = mockStore({});

describe('`fetchLocationAsync` thunk tests', function() {
    var server;

    before(function setupFakeXHR() {
        global.window.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
        server = sinon.fakeServer.create({
            respondImmediately: true
        });
    });

    afterEach(function restoreStoreActions() {
        store.clearActions();
    });

    after(function restoreXHR() {
        global.window.XMLHttpRequest.restore();
        server.restore();
    });

    it('when called with a 200 response, returns the expected store actions', function() {
        var payload = {
            id: 353500,
            name: 'SHIRLEY (SOUTHAMPTON)',
            lat: '-1.4235',
            lon: '50.9231',
            country: 'ENGLAND',
            continent: 'EUROPE',
            temperature: 15 + '&deg;C',
            windSpeed: 7 + 'mph',
            windDirection: 'WSW'
        };

        var receiveLocationAction = receiveLocation(payload);

        server.respondWith('GET', /datapoint/, [
            200, {'Content-Type': 'application/json'},
            JSON.stringify({
                SiteRep: { DV: {
                    Location: {
                        i: payload.id,
                        name: payload.name,
                        lat: payload.lat,
                        lon: payload.lon,
                        country: payload.country,
                        continent: payload.continent,
                        Period: [{
                            Rep: [{
                                T: 15,
                                S: 7,
                                D: payload.windDirection
                            }]
                        }]
                    }
                }}
            })
        ]);

        return store.dispatch(
            fetchLocationAsync(payload.id)
        ).then(function() {
            var actions = store.getActions();

            expect(actions).to.have.lengthOf(2);
            expect(actions[0]).to.eql(fetchLocation());
            expect(actions[1]).to.have.property('payload');
            expect(actions[1].payload).to.eql(payload);
            expect(actions[1]).to.have.property('type', receiveLocationAction.type);
            expect(actions[1]).to.have.property('meta');
            expect(actions[1].meta).to.have.property('timestamp');
            expect(actions[1].meta.timestamp).to.be.at.least(receiveLocationAction.meta.timestamp);
            expect(actions[1]).to.have.property('error', receiveLocationAction.error);
        });
    });

    it('when called with a 403 response, returns the expected store actions', function() {
        server.respondWith('GET', /datapoint/, [
            403, {"Content-Type": 'text/html'}, 'Nope.'
        ]);

        return store.dispatch(
            fetchLocationAsync(353500)
        ).then(function() {}, function() {
            var actions = store.getActions();

            expect(actions).to.have.lengthOf(2);
            expect(actions[0]).to.eql(fetchLocation());
            expect(actions[1]).to.eql(receiveLocation(new Error()));
        });
    });
});
