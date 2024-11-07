import { expressApi } from "@/lib/axios-conf";
import {
  Blog,
  Category,
  IPayload,
  IResponse,
  IUser,
  IUserProfile,
} from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Badge } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FollowButton } from "../../features/post/components/follow-button";

const getTop5Users = async () => {
  const { data } = await expressApi.get<
    IResponse<IPayload<IUserProfile<IUser>[]>>
  >("/blog/profile/top/5/author");
  return data.data;
};

const getTop5Trending = async () => {
  const { data } = await expressApi.get<IResponse<IPayload<Blog[]>>>(
    "/blog/top/5/trending"
  );
  return data.data;
};

const getTop5Recent = async () => {
  const { data } = await expressApi.get<IResponse<IPayload<Blog[]>>>(
    "/blog/top/5/recent"
  );
  return data.data;
};

const getTopTopic = async () => {
  const { data } = await expressApi.get<IResponse<IPayload<Category[]>>>(
    "blog/category/top/5"
  );
  return data.data;
};

type SidebarProps = {};

export const Sidebar: React.FC<SidebarProps> = () => {
  const { data: data1 } = useQuery({
    queryKey: ["top5users"],
    queryFn: getTop5Users,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });
  const { data: data2 } = useQuery({
    queryKey: ["top5trending"],
    queryFn: getTop5Trending,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });
  const { data: data3 } = useQuery({
    queryKey: ["top5recent"],
    queryFn: getTop5Recent,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  const { data: data4 } = useQuery({
    queryKey: ["top5topic"],
    queryFn: getTopTopic,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  return (
    <aside className="hidden lg:block w-[25rem] border-l p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trending Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data2?.data.map((post) => (
            <div key={post._id} className="space-y-1">
              <h3 className="font-medium leading-none">{post.title}</h3>
              <p className="text-sm text-muted-foreground">
                {post.author?.account?.username}
              </p>
              <p className="text-xs text-muted-foreground">
                {post.likes} likes
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data3?.data.map((post) => (
            <div key={post._id} className="space-y-1">
              <h3 className="font-medium leading-none">{post.title}</h3>
              <p className="text-sm text-muted-foreground">
                {post.author?.account?.username}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(post?.createdAt), "MMM d, yyyy")}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>People to Follow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data1?.data.map((person) => (
            <div key={person._id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage
                    className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                    src={person?.account?.avatar?.url}
                    alt={person?.account?.username}
                  />
                  <AvatarFallback>
                    <div className="w-12 h-12 flex items-center justify-center border-2 rounded-full">
                      {person?.account?.username.substring(0, 2).toUpperCase()}
                    </div>
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {person?.account?.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {person?.account?.username}
                  </p>
                </div>
              </div>
              <FollowButton
                followto={person?.account?._id}
                isFollowing={person.isFollowing}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data4?.data.map((topic, index) => (
              <Badge key={index}>{topic.name}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};
