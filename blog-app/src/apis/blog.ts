import { expressApi } from "@/lib/axios-conf";
import { IUser, Blog, Category, IComment, IResponse, IPayload } from "@/types";
import { blogType } from "@/types/schema/blog";
import { AxiosError, AxiosResponse } from "axios";

const createBlog = async (data: blogType) => {
  try {
    const response: AxiosResponse = await expressApi.post(`/blog/create`, data);
    return response as AxiosResponse;
  } catch (error: AxiosError<any, any> | any) {
    console.log(error.response);
    return error?.response as any;
  }
};

/**
 * Retrieves all blog posts.
 *
 * @returns A promise that resolves to an `AxiosResponse` object containing a `IPayload` object with
 *          an array of `Blog` objects, a `totalItems` property with the total number of items, and
 *          a `message` property with a success message.
 * @throws An `AxiosError` if the request fails.
 */
export const fetchAllPosts = async () =>
  expressApi
    .get<IResponse<IPayload<Blog[]>>>("/blog/all")
    .catch((error: any) => {
      throw error;
    });

const getBlogById = async (pid: string): Promise<AxiosResponse<Blog[]>> =>
  expressApi.get<Blog[]>(`/blog/reading/${pid}`).catch((error) => {
    throw error;
  });

const getCommentsByPostId = async (
  postId: string
): Promise<AxiosResponse<Comment[]>> =>
  expressApi.get<Comment[]>(`/blog/comment/all/${postId}`).catch((error) => {
    throw error;
  });

const getAllCategories = async (): Promise<AxiosResponse<Category[]>> =>
  expressApi.get<Category[]>(`/blog/category/all`).catch((error) => {
    throw error;
  });

export { createBlog, getBlogById, getAllCategories, getCommentsByPostId };
