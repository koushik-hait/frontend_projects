import { expressApi } from "@/lib/axios-conf";
import { blogType } from "@/types/schema/blog";
import { AxiosError, AxiosResponse } from "axios";

export const createBlog = async (data: blogType) => {
  try {
    const response: AxiosResponse = await expressApi.post(`/blog/create`, data);
    return response as AxiosResponse;
  } catch (error: AxiosError<any, any> | any) {
    console.log(error.response);
    return error?.response as any;
  }
};

export const getAllBlogs = async () => {
  try {
    const response: AxiosResponse = await expressApi.get(`/blog/all`);
    return response as AxiosResponse;
  } catch (error: AxiosError<any, any> | any) {
    console.log(error.response);
    return error?.response as any;
  }
};

export const getBlogById = async (bid: string) => {
  try {
    const response: AxiosResponse = await expressApi.get(
      `/blog/reading/${bid}`
    );
    return response as AxiosResponse;
  } catch (error: AxiosError<any, any> | any) {
    console.log(error.response);
    return error?.response as any;
  }
};

export const getAllCategories = async () => {
  try {
    const response: AxiosResponse = await expressApi.get(`/blog/category/all`);
    return response as AxiosResponse;
  } catch (error: AxiosError<any, any> | any) {
    console.log(error.response);
    return error?.response as any;
  }
};
