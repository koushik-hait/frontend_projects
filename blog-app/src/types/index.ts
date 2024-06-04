export type Category = {
  _id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
};
export type Blog = {
  _id: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  createdAt: string;
  publishedAt: string;
  publishStatus: string;
  tags: string[];
  category: string;
  author: string;
};
