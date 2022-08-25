import { instance } from "./index";

export const sendEmail = async (email) => {
  const data = await instance.post("email/sendAuthCode", email);
  return data;
};

export const confirmEmail = async (authData) => {
  const data = await instance.post("email/confirmAuthCode", authData);
  return data;
};
