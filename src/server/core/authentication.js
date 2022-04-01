// (Example of Authentication with Auth0, 2021/2021)

/**
 * @file authentication.js
 * @author UP2002753, portsoc
 * @description auth0 authentication middleware
 */

const config = require('./auth-config.js');
const auth = require('express-openid-connect');
const authHelp = require('./auth0-helpers.js');
const Logger = require('../logger.js');

/**
 * @type {Object}
 * @property {boolean} authRequired - Whether or not authentication is required.
 * @property {auth0Logout} auth0Logout
 * @property {secret} - The client secret.
 * @property {baseURL} - The base URL of the webserver.
 * @property {clientID} - The client ID.
 * @property {issuerBaseURL} - The issuer base URL.
 */
const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: 'SHjTkx49fAMM4hvUjOaepiYK6iZIQfzyPla24wKkSLQQLqb5x7LkUj3mPgcvu375',
  baseURL: 'http://localhost:8080',
  clientID: config.clientId,
  issuerBaseURL: `https://${config.domain}`,
};

/**
 * Auth0 Init function
 * @param {app} app - The express app.
 */
function auth0(app) {
  app.use(auth.auth(authConfig));
  app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    Logger.Info(req.oidc.userinfo);
  });


  const auth0 = authHelp(config);

  app.get('/block/api/auth-config', (req, res) => {
    Logger.Info('Auth-config requested');
    res.json(config);
  });

  app.use('/api', auth0.checkJwt);

  /**
   * Get router for auth0
   */
  app.get('/api/hello', async (req, res) => {
    const userId = auth0.getUserID(req);

    // load the user information, in production this would need caching or storing in a database
    const profile = await auth0.getProfile(req);

    res.send(JSON.stringify(profile, null, 2));

    Logger.Info('Successful authentication request by ' + userId);
  });

  app.get('/authorized', (req, res) => {
    Logger.Info('Authorised request');
    res.send('Secured Resource');
  });
}

module.exports = auth0;
