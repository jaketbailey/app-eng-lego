import config from './auth-config.js';
import * as auth from 'express-openid-connect';
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

  // app.get('/profile', auth.requiresAuth(), (req, res) => {
  //   res.send(JSON.stringify(req.oidc.user));
  // });

  app.get('/authorized', (req, res) => {
    res.send('Secured Resource');
  });
}
