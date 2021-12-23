import createAuth0Client from '@auth0/auth0-spa-js';

async function initialiseClient(auth0) {
  const config = await fetchConfig();
  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience,
  });
  return auth0;
}

module.exports = { initialiseClient: initialiseClient };
