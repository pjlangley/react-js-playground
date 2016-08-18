import register from 'ignore-styles';

register(undefined, function(module, filename) {
    if (filename.match(/location\.css$/)) {
        module.exports = {loader: 'loader'};
    }
    else if (filename.match(/location-info\.css$/)) {
        module.exports = {'locationInfo': 'locationInfo'};
    }

    return null;
});
