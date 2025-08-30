import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_83ju4bBly',
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin + '/login',
    clientId: '3g9ifoegsd2u8dk9tn9m956ggh',
    usePushedAuthorisationRequests: false,
    scope: 'openid email', // 'openid profile offline_access ' + your scopes
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    ignoreNonceAfterRefresh: true,
    customParamsAuthRequest: {
      prompt: 'login', // login, consent
    },
    maxIdTokenIatOffsetAllowedInSeconds: 600,
  }
}
