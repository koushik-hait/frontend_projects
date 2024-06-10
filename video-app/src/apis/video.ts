import { expressApi } from "@/lib/axios-conf";
import { AxiosResponse, AxiosError } from "axios";

export const getAllCategories = async () => {
  try {
    const response: AxiosResponse = await expressApi.get(`/video/category/all`);
    return response as AxiosResponse;
  } catch (error: AxiosError<any, any> | any) {
    console.log(error.response);
    return error?.response as any;
  }
};
