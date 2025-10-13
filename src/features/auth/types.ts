export type OauthLoginRequest = {
  platform: string;
};
export type OauthLoginResponse = {
  url: string;
  redirectUrl: string;
};

export type OauthLoginCallbackRequest = {
  code: string;
  redirect_uri: string;
  grant_type: string;
  code_verifier: string;
  platform: string;
};
export type OauthLoginCallbackResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};
export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
