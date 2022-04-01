// (Example of Authentication with Auth0, 2021/2021)

/**
 * @file auth0-helpers.js
 * @author portsoc
 * @description auth0 authentication helpers
 */

const OAuth2JWTBearer = require('express-oauth2-jwt-bearer');
const Logger = require('../logger.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const status401Errors = [
  'UnauthorizedError',
  'InvalidTokenError',
];

function setup(authConfig) {
  const checker = OAuth2JWTBearer.auth({
    audience: authConfig.audience,
    issuerBaseURL: `https://${authConfig.domain}`,
  });

  return {
    getUserID,
    checkJwt,
    getProfile,
  };

  function getUserID(req) {
    if (!req.auth || !req.auth.payload) return null;

    // this is where OAuth2JWTBearer puts the user ID:
    return req.auth.payload.sub;
  }

  // use OAuth2JWTBearer to check the actual token, but handle 401 errors
  function checkJwt(req, res, next) {
    return checker(req, res, (err) => {
      if (err && status401Errors.includes(err.name)) {
        res.sendStatus(401);
      } else {
        Logger.Error(err);
        next(err);
      }
    });
  }

  async function getProfile(req) {
    // if we don't have any auth information, there will be no profile
    if (!req.auth || !req.auth.token) return null;

    try {
      const response = await fetch(`https://${authConfig.domain}/userinfo`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${req.auth.token}`,
        },
      });

      if (!response.ok) throw response;

      return await response.json();
    } catch (err) {
      Logger.Error('error getting auth profile', req.auth, err);
      return null;
    }
  }
}

module.exports = setup;
