import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IComment } from "@/types";
import parse from "html-react-parser";
import { format } from "date-fns";
import { LikeDislikeButton } from "@/features/post/components/like-button";

export default function CommentCard({ comment }: { comment: IComment }) {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <Card className="w-full max-w-3xl border-none">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={comment?.author?.avatar.url} alt="User avatar" />
            <AvatarFallback>
              <div className="w-12 h-12 border-2 rounded-full flex items-center justify-center">
                {comment.author?.username.substring(0, 2).toUpperCase()}
              </div>
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">
                {comment.author?.username}
              </h3>
              <span className="text-xs text-gray-500">
                {format(comment.createdAt, "MMM dd, yyyy")} at{" "}
                {format(comment.createdAt, "h:mm a")}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {parse(JSON.parse(comment.content))}
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <LikeDislikeButton
                likes={comment?.likes}
                isLiked={comment?.isLiked}
                commentId={comment._id}
              />

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs font-medium">Reply</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
