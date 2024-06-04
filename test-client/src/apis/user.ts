import { expressApi } from "@/lib/axios-conf";
import { loginType, registerType } from "@/types/schema/user";
import { AxiosError, AxiosResponse } from "axios";

export const registerUser = async (data: registerType) => {
  try {
    const response: AxiosResponse = await expressApi.post(
      `/user/register`,
      data
    );
    return response as any;
  } catch (error: AxiosError<any, any> | any) {
    console.log(error.response);
    return error?.response as any;
  }
};

export const loginUser = async (data: loginType) => {
  try {
    const response: AxiosResponse = await expressApi.post(`/user/login`, data);
    return response as AxiosResponse;
  } catch (error: AxiosError<any, any> | any) {
    console.log(error.response);
    return error?.response as any;
  }
};

export const logoutUser = async () => {
  try {
    const response: AxiosResponse = await expressApi.post(`/user/logout`);
    return response as AxiosResponse;
  } catch (error: AxiosError<any, any> | any) {
    console.log(error.response);
    return error?.response as any;
  }
};

export const getCurrentUser = async () => {
  try {
    const response: AxiosResponse = await expressApi.get(`/user/current-user`);
    return response as AxiosResponse;
  } catch (error: AxiosError<any, any> | any) {
    console.log(error.response);
    return error?.response as any;
  }
};
