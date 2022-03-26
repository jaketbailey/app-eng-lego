import config from './auth-config.js';
import * as auth from 'express-openid-connect';
import authHelp from './auth0-helpers.js';

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: 'SHjTkx49fAMM4hvUjOaepiYK6iZIQfzyPla24wKkSLQQLqb5x7LkUj3mPgcvu375',
  baseURL: 'http://localhost:8080',
  clientID: config.clientId,
  issuerBaseURL: `https://${config.domain}`,
};

export default function (app) {
  app.use(auth.auth(authConfig));
  app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    console.log(req.oidc.userinfo);
  });

  const auth0 = authHelp(config);

  app.get('/block/api/auth-config', (req, res) => {
    res.json(config);
  });

  app.use('/api', auth0.checkJwt);

  app.get('/api/hello', async (req, res) => {
    const userId = auth0.getUserID(req);

    // load the user information, in production this would need caching or storing in a database
    const profile = await auth0.getProfile(req);

    res.send(JSON.stringify(profile, null, 2));

    console.log('successful authenticated request by ' + userId);
  });

  app.get('/authorized', (req, res) => {
    res.send('Secured Resource');
  });
}
