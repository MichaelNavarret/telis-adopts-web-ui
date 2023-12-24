import request from "../tools/request";
import { LoginRequest, LoginResponse, VerifyOtpRequest } from "../types/login";
import { OnwerRequest } from "../types/owner";

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

export const resetPasswordLink = async (ownerRequest: OnwerRequest) => {
  console.log("Entrnado al metodo");
  const data = await request
    .post<LoginResponse>("auth/reset-password-link", ownerRequest)
    .then((res) => res.data);
  return data;
};
