import { instance } from "./index";

export const signup = async (formData) => {
  const data = await instance.post("users/signup", formData);
  return data;
};

export const login = async (formData) => {
  const data = await instance.post("users/login", formData);
  return data;
};
