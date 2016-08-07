require('dotenv').config();

module.exports = function(source, map) {
    source = source.replace('API_KEY', 'API_KEY = "' + process.env.API_KEY + '"');
    this.callback(null, source, map);
};
