import loadAccountPage from './account.mjs';
import createUser from './user.mjs';

async function fetchConfig() {
  const response = await fetch('/auth-config');
  const config = await response.json();
  return config;
}

let auth0 = null;

async function initialiseClient() {
  const config = await fetchConfig();
  // eslint-disable-next-line no-undef
  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience,
  });
  return auth0;
}

async function updateUI() {
  const isAuthenticated = await auth0.isAuthenticated();
  console.log(isAuthenticated);
  document.getElementById('authBtn').disabled = isAuthenticated;
  document.getElementById('authBtnLogout').disabled = !isAuthenticated;
  if (isAuthenticated) {
    // const user = await auth0.getUser();
    const login = document.getElementById('authBtn');
    const logout = document.getElementById('authBtnLogout');
    const website = document.getElementById('website');
    const name = document.createElement('p');
    const user = auth0.getUser();
    user.then(function (res) {
      if (window.location.pathname === '/account/') {
        loadAccountPage(res);
      }
      name.textContent = `Logged in as ${res.name}`;
      website.appendChild(name);
      createUser(res);
    });

    console.log(login);
    console.log(logout);
    login.style.display = 'none';
    logout.style.display = 'block';

    const account = document.getElementById('account');
    account.style.display = 'block';
  }
}

async function login() {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin,
  });
}

function logout() {
  auth0.logout({
    returnTo: window.location.origin,
  });
}

// check for the code and state parameters from Auth0 login redirect
async function handleAuth0Redirect() {
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) return;

  const query = window.location.search;
  if (query.includes('state=')) {
    try {
      // process the login state
      await auth0.handleRedirectCallback();
    } catch (e) {
      window.alert(e.message || 'authentication error, sorry');
      logout();
    }

    // remove the query parameters
    window.history.replaceState({}, document.title, '/');

    await updateUI();
  }
}

function setupListeners() {
  document.getElementById('authBtn').addEventListener('click', login);
  document.getElementById('authBtnLogout').addEventListener('click', logout);
}


async function init() {
  await initialiseClient();
  await setupListeners();
  await updateUI();
  await handleAuth0Redirect();
}


window.addEventListener('load', init);
