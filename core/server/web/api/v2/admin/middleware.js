const prettyURLs = require('../../../shared/middlewares/pretty-urls');
const cors = require('../../../shared/middlewares/api/cors');
const {adminRedirect} = require('../../../shared/middlewares/url-redirects');
const auth = require('../../../../services/auth');

/**
 * Authentication for private endpoints
 */
module.exports.authenticatePrivate = [
    auth.authenticate.authenticateClient,
    auth.authenticate.authenticateUser,
    auth.authorize.requiresAuthorizedUser,
    cors,
    adminRedirect,
    prettyURLs
];

/**
 * Authentication for client endpoints
 */
module.exports.authenticateClient = function authenticateClient(client) {
    return [
        auth.authenticate.authenticateClient,
        auth.authenticate.authenticateUser,
        auth.authorize.requiresAuthorizedClient(client),
        cors,
        adminRedirect,
        prettyURLs
    ];
};
