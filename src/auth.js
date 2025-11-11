import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: import.meta.env.REACT_APP_USER_POOL_ID,
  ClientId: import.meta.env.REACT_APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export function login() {
  const domain = import.meta.env.REACT_APP_COGNITO_DOMAIN;
  const redirect = import.meta.env.OAUTH_SIGN_IN_REDIRECT_URL;
  const clientId = import.meta.env.REACT_APP_CLIENT_ID;

  window.location.href =
    `${domain}/login?response_type=code&client_id=${clientId}&redirect_uri=${redirect}`;
}

export function logout() {
  const domain = import.meta.env.REACT_APP_COGNITO_DOMAIN;
  const redirect = import.meta.env.OAUTH_SIGN_IN_REDIRECT_URL;
  const clientId = import.meta.env.REACT_APP_CLIENT_ID;

  window.location.href =
    `${domain}/logout?client_id=${clientId}&logout_uri=${redirect}`;
}

export function getUser() {
  return userPool.getCurrentUser();
}

export async function getUserToken() {
  const user = getUser();
  if (!user) return null;

  return new Promise((resolve, reject) => {
    user.getSession((err, session) => {
      if (err) reject(err);
      else resolve(session.getIdToken().getJwtToken());
    });
  });
}
