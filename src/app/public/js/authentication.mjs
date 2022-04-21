// (Example of Authentication with Auth0, 2021/2021)

/**
 * @file authentication.mjs
 * @author UP2002753, portsoc
 * @description Client-side authentication handlers and UI updates
 * @namespace AuthenticationClient
 */

import loadAccountPage from './account.mjs';
import { createUser, getBasketId, deleteUser } from './user.mjs';
import generateUnregistered from './unregistered.mjs';
import errorCheck from './error.mjs';

/**
 * @function fetchConfig
 * @returns {object} - Contains all auth config variables
 * @memberof AuthenticationClient
 * @description Fetches auth config variables from server
 */
async function fetchConfig() {
  try {
    const response = await fetch('/block/api/auth-config');
    const config = await response.json();
    return config;
  } catch (err) {
    errorCheck(err);
  }
}

let auth0 = null;

/**
 * @function initialiseClient
 * @memberof AuthenticationClient
 * @returns {function} - Initialises auth0 client
 */
async function initialiseClient() {
  const config = await fetchConfig();
  try {
    // eslint-disable-next-line no-undef
    auth0 = await createAuth0Client({
      domain: config.domain,
      client_id: config.clientId,
      audience: config.audience,
    });
    return auth0;
  } catch (err) {
    errorCheck(err);
  }
}

/**
 * @function updateUI
 * @memberof AuthenticationClient
 * @description Updates the UI based on the current user status (logged in or out)
 */
async function updateUI() {
  const isAuthenticated = await auth0.isAuthenticated();
  console.log(isAuthenticated);
  document.getElementById('authBtn').disabled = isAuthenticated;
  document.getElementById('authBtnLogout').disabled = !isAuthenticated;
  if (isAuthenticated) {
    const unregisteredId = localStorage.getItem('customerId');
    const login = document.getElementById('authBtn');
    const logout = document.getElementById('authBtnLogout');
    const website = document.getElementById('website');
    const name = document.createElement('p');
    name.className = 'header';
    const user = auth0.getUser();
    user.then(async function (res) {
      localStorage.setItem('customerId', res.sub);
      if (window.location.pathname === '/account/') {
        loadAccountPage(res);
      }
      name.textContent = `Logged in as ${res.name}`;
      website.appendChild(name);
      await createUser(res);
    });

    login.style.display = 'none';
    logout.style.display = 'block';

    const account = document.getElementById('account');
    account.style.display = 'block';

    const basketId = await getBasketId(unregisteredId);
    console.log(basketId);
    console.log('this basket');
    await deleteUser(unregisteredId, basketId);
  } else {
    generateUnregistered();
  }
}

/**
 * @function login
 * @memberof AuthenticationClient
 * @description Logs in the user
 */
async function login() {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin,
  });
}

/**
 * @function logout
 * @memberof AuthenticationClient
 * @description Logs out the user
 */
function logout() {
  localStorage.removeItem('customerId');
  auth0.logout({
    returnTo: window.location.origin,
  });
}

// check for the code and state parameters from Auth0 login redirect
/**
 * @function handleAuth0Redirect
 * @memberof AuthenticationClient
 * @description Handles redirect from Auth0 login
 */
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

/**
 * @function setupListeners
 * @memberof AuthenticationClient
 * @description Sets up listeners for auth0 logout/login button clicks
 */
function setupListeners() {
  document.getElementById('authBtn').addEventListener('click', login);
  document.getElementById('authBtnLogout').addEventListener('click', logout);
}

/**
 * function callServer
 * @memberof AuthenticationClient
 * @description Calls the Auth0 API to get the user's profile
 * @returns {promise} - Promise containing the user's profile
 */
export async function callServer() {
  const token = await auth0.getTokenSilently();

  const fetchOptions = {
    credentials: 'same-origin',
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  };
  const response = await fetch('/api/hello', fetchOptions);
  if (!response.ok) {
    console.log(response.status);
    return;
  }

  // handle the response
  const data = await response.json();
  console.info(data);
  return data;
}

/**
 * @function init
 * @memberof AuthenticationClient
 * @description Initialises the authentication client
 */
async function init() {
  await initialiseClient();
  await setupListeners();
  await updateUI();
  await handleAuth0Redirect();
}


window.addEventListener('load', init);
