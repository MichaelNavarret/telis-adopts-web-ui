export type LoginRequest = {
  username: string;
  password: string;
};

export type VerifyOtpRequest = LoginRequest & {
  otpCode: string;
};

export type LoginResponse = {
  token: string;
  canSkip2fa: boolean;
};

export type ResendOtpRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  email: string;
};

export type ChangePasswordRequest = {
  token: string;
  newPassword: string;
};
