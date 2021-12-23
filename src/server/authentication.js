const authConfig = require('./auth-config');
const { auth, requiresAuth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'SHjTkx49fAMM4hvUjOaepiYK6iZIQfzyPla24wKkSLQQLqb5x7LkUj3mPgcvu375',
  baseURL: 'http://localhost:8080',
  clientID: 'pblOXqMVXtK2t4TFbgv1hfHzhkSydjmM',
  issuerBaseURL: 'https://up2002753.eu.auth0.com',
};

function auth0(app) {
  app.use(auth(config));
  app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    console.log(req.oidc.userinfo);
  });

  app.get('/auth-config', (req, res) => {
    res.send(authConfig);
  });

  app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

  app.get('/authorized', (req, res) => {
    res.send('Secured Resource');
  });
}

module.exports = {
  auth0: auth0,
};
