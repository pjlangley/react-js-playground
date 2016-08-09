import { expect } from 'chai';
import sinon from 'sinon';
var url = require('url');

import fetch from '../../src/modules/fetch-location';

describe('fetch-location module', function() {
    var locationId = 353500;
    var server, result, request;

    before(function() {
        global.window.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
        server = sinon.fakeServer.create({
            respondImmediately: true
        });

        server.respondWith('GET', /datapoint/, [
            200, {'Content-Type': 'application/json'}, JSON.stringify({id: locationId})
        ]);

        result = fetch(locationId);
        request = url.parse(server.requests[0].url, true);
    });

    after(function restoreXHR() {
        global.window.XMLHttpRequest.restore();
        server.restore();
    });

    it('request `protocol` is HTTP', function() {
        expect(request.protocol).to.equal('http:');
    });

    it('correct `host` on request', function() {
        expect(request.host).to.equal('datapoint.metoffice.gov.uk');
    });

    it('correct `pathname` on request', function() {
        expect(request.pathname).to.equal('/public/data/val/wxfcs/all/json/' + locationId);
    });

    it('contains correct `res` parameter value', function() {
        expect(request.query.res).to.equal('3hourly');
    });

    it('successful request returns resolved promise with correct data', function() {
        return result.then(function onResolve(data, textStatus, jqXHR) {
            expect(data).to.have.property('id', locationId);
        });
    });
});
