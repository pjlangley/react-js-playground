import { isDegreesC } from '../../src/modules/validate';
import { expect } from 'chai';

describe('validate method `isDegreesC`', function() {
    it('`9&deg;C` is valid', function() {
        expect(isDegreesC('9&deg;C')).to.not.be.null;
    });

    it('`99&deg;C` is valid', function() {
        expect(isDegreesC('99&deg;C')).to.not.be.null;
    });

    it('`123&deg;C` is valid', function() {
        expect(isDegreesC('123&deg;C')).to.not.be.null;
    });

    it('`-1&deg;C` is valid', function() {
        expect(isDegreesC('-1&deg;C')).to.not.be.null;
    });

    it('`-17&deg;C` is valid', function() {
        expect(isDegreesC('-17&deg;C')).to.not.be.null;
    });

    it('`0&deg;C` is valid', function() {
        expect(isDegreesC('0&deg;C')).to.not.be.null;
    });

    it('`0C` is invalid', function() {
        expect(isDegreesC('0C')).to.be.null;
    });

    it('`19&lt;C` is invalid', function() {
        expect(isDegreesC('19&lt;C')).to.be.null;
    });
});
