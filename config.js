const env = process.env.NODE_ENV || 'development';

const credentials = require(`./.credential.${env}`);

module.exports = credentials