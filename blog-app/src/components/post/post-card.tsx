import { useState } from "react";
import { Image } from "@/components/ui/image";
import { format } from "date-fns";
import {
  Heart,
  MessageCircle,
  Bookmark,
  BookmarkCheck,
  MoreVertical,
  Share2,
  Flag,
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Blog } from "@/types";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: Blog;
};

export const BlogPostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post?.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={post?.author.account.avatar?.url}
              alt={post?.author.account.username}
            />
            <AvatarFallback>
              {post?.author.account.username.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">
              {post?.author.account.username}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(post?.createdAt), "MMM d, yyyy")}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Share2 className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Flag className="mr-2 h-4 w-4" />
              <span>Report</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-0">
        <AspectRatio ratio={16 / 9}>
          <Link to={`/post/${post?._id}`}>
            <Image
              src={post?.coverImage}
              alt={post?.title}
              fill
              className="rounded-none object-cover"
            />
          </Link>
        </AspectRatio>
      </CardContent>
      <CardContent className="pt-4 relative">
        <Link to={`/post/${post?._id}`}>
          <h2 className="mt-10 text-2xl text-wrap font-semibold mx-2">
            {post?.title}
          </h2>
        </Link>
        <div className="flex flex-wrap gap-2 mb-4 mt-4">
          {post?.tags.map((tag) => (
            <Link to={`/tag/${tag}`} key={tag}>
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={post.isLiked ? "text-red-500 dark:text-red-400" : ""}
          >
            {isLiked ? (
              <Heart className="mr-2 h-4 w-4 fill-pink-700" />
            ) : (
              <Heart className="mr-2 h-4 w-4" />
            )}
            <span className="sr-only">Like</span>
            {post.likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="mr-2 h-4 w-4" />
            {post.comments}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Button variant="ghost" size="sm">
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              {post.bookmarks}
            </Button>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
