/**
 * @file auth-config.js
 * @author UP2002753
 * @description auth0 authentication config
 */

/**
 * type {Object}
 * @memberof Authentication
 * @property {string} domain - auth0 application domain.
 * @property {string} clientId - auth0 application client id.
 * @property {string} audience - auth0 api audience for api calls.
 */
const config = {
  domain: 'up2002753.eu.auth0.com',
  clientId: 'pblOXqMVXtK2t4TFbgv1hfHzhkSydjmM',
  audience: 'https://localhost:8080/api',
};

module.exports = config;
