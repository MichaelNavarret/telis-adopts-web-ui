import request from "../tools/request";
import { BaseResponse } from "../types/commons";
import {
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
} from "../types/login";
import { OwnerRequest } from "../types/owner";

export const login = async (loginRequest: LoginRequest) => {
  const data = await request
    .post<LoginResponse>("auth/generate-login-token", loginRequest)
    .then((res) => res.data);
  return data;
};

export const verifyOtp = async (verifyOtpRequest: VerifyOtpRequest) => {
  const data = await request
    .post<LoginResponse>("auth/login", verifyOtpRequest)
    .then((res) => res.data);
  return data;
};

export const resetPasswordLink = async (ownerRequest: OwnerRequest) => {
  const data = await request
    .post<LoginResponse>("auth/reset-password-link", ownerRequest)
    .then((res) => res.data);
  return data;
};

export const updatePasswordByLink = async (
  changePasswordRequest: ChangePasswordRequest
) => {
  const data = await request
    .post<BaseResponse>("auth/update-password", changePasswordRequest)
    .then((res) => res.data);
  return data;
};
