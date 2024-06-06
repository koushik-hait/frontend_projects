import { Blog } from "@/types";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type PostCardProps = {
  post: Blog;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="w-96 h-56 bg-base-100 shadow-xl text-white text-balance overflow-hidden">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        {/* <CardDescription>{post.description}</CardDescription> */}
      </CardHeader>
      <CardContent>
        <img
          className="w-[250px] h-[150px] object-cover "
          src={post.coverImage}
          alt={post.title}
        />
      </CardContent>
      {/* <CardFooter>{post.publishStatus}</CardFooter> */}
    </Card>
  );
};

export default PostCard;
