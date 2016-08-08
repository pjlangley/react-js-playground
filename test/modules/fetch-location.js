import { expect } from 'chai';
import sinon from 'sinon';
var url = require('url');

var ajaxRequests = [];
global.window.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
global.window.XMLHttpRequest.onCreate = function(xhr) {
    ajaxRequests.push(xhr);
};

import fetch from '../../src/modules/fetch-location';

describe('fetch-location module', function() {
    var locationId = 353500;
    var result = fetch(locationId);
    var request = url.parse(ajaxRequests[0].url, true);

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
        ajaxRequests[0].respond(
            200, {'Content-Type': 'application/json'},
            JSON.stringify({id: locationId})
        );

        return result.then(function onResolve(data, textStatus, jqXHR) {
            expect(data).to.have.property('id', locationId);
        });
    });

    after(function restoreXMLHttpRequest() {
        global.window.XMLHttpRequest.restore();
    });
});
