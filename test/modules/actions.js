import { expect } from 'chai';
import { fetchLocation, receiveLocation } from '../../src/modules/actions';

describe('Redux Actions', function() {
    it('`fetch-location` returns the correct shape', function() {
        expect(fetchLocation()).to.eql({
            type: 'FETCH_LOCATION'
        });
    });

    describe('`receive-location` action', function() {
        it('erroneous `payload` returns the correct shape', function() {
            var action = receiveLocation(new Error());

            expect(action).to.have.property('type', 'RECEIVE_LOCATION');
            expect(action).to.have.property('error', true);
            expect(action.payload).to.be.an.instanceOf(Error);
        });

        it('valid `payload` returns the correct shape', function() {
            var now = new Date().getTime();
            var action = receiveLocation({});

            expect(action).to.have.property('type', 'RECEIVE_LOCATION');
            expect(action).to.have.property('error', null);
            expect(action.payload).to.eql({});
            expect(action).to.have.property('meta');
            expect(action.meta).to.have.property('timestamp');
            expect(action.meta.timestamp).to.be.at.least(now);
        });
    });
});
