interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar: {
    url: string;
    localPath: string;
  };
  isEmailVerified: boolean;
  loginType: string;
  user_role: string;
  createdAt: string;
  updatedAt: string;
}

interface IUserProfile<U> {
  _id: string;
  address: string;
  bio: string;
  city: string;
  comments: Comment[];
  country: string;
  countryCode: string;
  coverImage: {
    url: string;
    localPath: string;
  };
  createdAt: string;
  dob: string;
  firstName: string;
  lastName: string;
  owner: string;
  phoneNumber: string;
  posts: Blog[];
  state: string;
  updatedAt: string;
  account: U;
  following: number;
  followers: number;
}

interface Follower {
  _id: string;
  followeeId: string;
  followerId: string;
  createdAt: string;
  updatedAt: string;
}

type Category = {
  _id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
};
type Blog = {
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
  author: IUserProfile<IUser>;
  comments: number;
  likes: number;
  bookmarks: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

interface IComment {
  _id: string;
  content: string;
  postId: string;
  author: IUser[];
  createdAt: string;
  updatedAt: string;
}

interface IPayload<D> {
  data: D;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number | 10;
  nextPage: number | null;
  page: number | 1;
  prevPage: number | null;
  serialNumberStartFrom: number | 1;
  totalItems: number;
  totalPages: number;
}

interface IResponse<T> {
  message: string;
  success: boolean;
  statusCode: number;
  data: T;
}

export type {
  IUser,
  Blog,
  Category,
  IComment,
  IPayload,
  IResponse,
  IUserProfile,
};
