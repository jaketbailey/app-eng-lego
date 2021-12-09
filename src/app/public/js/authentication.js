async function fetchConfig() {
  const response = await fetch('/auth-config');
  const config = await response.json();
  return config;
}

let auth0 = null;

async function initialiseClient() {
  const config = await fetchConfig();
  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience,
  });
  return auth0;
}

async function updateUI() {
  const isAuthenticated = await auth0.isAuthenticated();
  const button = document.getElementById('authBtn').disabled = isAuthenticated;
  if (isAuthenticated) {
    button.textContent = 'Logout';
    button.href = '/logout';.
  } else {
    button.textContent = 'Login';
    button.href = '/login';
  }
}

async function login() {
  await auth0.loginWithRedirect({
    redirect_url: window.location.origin,
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

    await updateAuthUI();
  }
}

function setupListeners() {
  document.getElementById('authBtn').addEventListener('click', login);
}


async function init() {
  await initializeAuth0Client();
  await setupListeners();
  await updateAuthUI();
  await handleAuth0Redirect();
}