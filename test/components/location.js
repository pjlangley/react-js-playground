import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Location from '../../src/components/location';
import locationReducer from '../../src/reducers/location';
import { receiveLocation } from '../../src/modules/actions';

import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

describe('<Location/>', function() {
    var store = createStore(locationReducer);
    var spy = sinon.spy(Location.prototype, 'componentDidMount');

    var wrapper = mount(
        <Provider store={store}>
            <Location/>
        </Provider>
    );

    describe('Initial structure integrity', function() {
        it('is the large card type from materialize', function() {
            expect(wrapper.find('div.card').hasClass('large')).to.equal(true);
        });

        it('contains a single `card-image` section', function() {
            expect(wrapper.find('div.card-image')).to.have.lengthOf(1);
        });

        it('contains a single `card-title` section', function() {
            expect(wrapper.find('span.card-title')).to.have.lengthOf(1);
        });

        it('contains a banner image', function() {
            expect(wrapper.find('div.card-image').find('img')).to.have.lengthOf(1);
        });

        it('contains a single `card-content` section', function() {
            expect(wrapper.find('div.card-content')).to.have.lengthOf(1);
        });

        it('contains a single `card-action` section', function() {
            expect(wrapper.find('div.card-action')).to.have.lengthOf(1);
        });

        it('contains a loading image', function() {
            expect(wrapper.find('img.loader')).to.have.lengthOf(1);
        });

        it('should not contain a `card-panel` (warning)', function() {
            expect(wrapper.some('div.card-panel')).to.equal(false);
        });

        it('should not contain location information yet', function() {
            expect(wrapper.find('ul.location-info')).to.have.lengthOf(0);
        });

        it('should not contain a location title', function() {
            expect(wrapper.find('span.card-title').text()).to.be.empty;
        });

        after(function() {
            store.dispatch(receiveLocation(new Error()));
            wrapper.update();
        });
    });

    describe('On error fetching location...', function() {
        it('loading section is hidden', function() {
            expect(wrapper.find('img.loader.hide')).to.have.lengthOf(1);
        });

        it('contains the warning component', function() {
            expect(wrapper.find('div.card-panel')).to.have.lengthOf(1);
        });

        it('warning message contains the correct text', function() {
            expect(wrapper.find('div.card-panel').text()).to.equal(
                'Sorry, we were unable to get the location information at this time. Please try again later.'
            );
        });

        after(function() {
            store.dispatch(receiveLocation({
                id: 353500,
                name: 'SHIRLEY (SOUTHAMPTON)',
                lat: '-1.4235',
                lon: '50.9231',
                country: 'ENGLAND',
                continent: 'EUROPE',
                temperature: '15&deg;C',
                windSpeed: '11mph',
                windDirection: 'WSW'
            }));
            wrapper.update();
        });
    });

    describe('Once location info is received...', function() {
        it('should contain the correct title', function() {
            expect(wrapper.find('span.card-title').text()).to.equal('SHIRLEY (SOUTHAMPTON)');
        });

        it('contains location information component', function() {
            expect(wrapper.find('ul.location-info')).to.have.lengthOf(1);
        });

        it('loading section is hidden', function() {
            expect(wrapper.find('img.loader.hide')).to.have.lengthOf(1);
        });

        it('warning component is not present', function() {
            expect(wrapper.find('div.card-panel')).to.have.lengthOf(0);
        });

        describe('location info contains...', function() {
            it('location id', function() {
                expect(wrapper.find('ul.location-info li.id').text()).to.contain('353500');
            });

            it('location lat', function() {
                expect(wrapper.find('ul.location-info li.lat').text()).to.contain('-1.4235');
            });

            it('location lon', function() {
                expect(wrapper.find('ul.location-info li.lon').text()).to.contain('50.9231');
            });

            it('location country', function() {
                expect(wrapper.find('ul.location-info li.country').text()).to.contain('ENGLAND');
            });

            it('location continent', function() {
                expect(wrapper.find('ul.location-info li.continent').text()).to.contain('EUROPE');
            });

            it('location temperature', function() {
                expect(wrapper.find('ul.location-info li.temperature').text()).to.contain('15');
            });

            it('location wind speed', function() {
                expect(wrapper.find('ul.location-info li.wind-speed').text()).to.contain('11mph');
            });

            it('location wind direction', function() {
                expect(wrapper.find('ul.location-info li.wind-direction').text()).to.contain('WSW');
            });
        });
    });

    describe('component life cycle integrity', function() {
        it('calls `componentDidMount once only`', function() {
            expect(spy.calledOnce).to.equal(true);
        });
    });
});