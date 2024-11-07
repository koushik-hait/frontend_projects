import { Heart } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { expressApi } from "@/lib/axios-conf";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type likeBittonProps = {
  isLiked: boolean;
  likes: number;
  postId?: string;
  commentId?: string;
};

export const LikeDislikeButton: React.FC<likeBittonProps> = ({
  isLiked,
  likes,
  postId,
  commentId,
}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const onClick = async () => {
    if (!user) {
      // alert("You can't like without being logged in.");
      return;
    }
    const url = postId ? `blog/like/p/${postId}` : `blog/like/c/${commentId}`;
    //call api
    const { data } = await expressApi.post(url);
    console.log(data.data);
    setIsLikedState(data.data.isLiked);
    setLikeCount(data.data.likes);
  };
  return (
    <>
      {isAuthenticated ? (
        <>
          {" "}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
            className={isLikedState ? "text-red-500 dark:text-red-400" : ""}
          >
            {isLikedState ? (
              <Heart className="mr-2 h-4 w-4 fill-pink-700" />
            ) : (
              <Heart className="mr-2 h-4 w-4" />
            )}
            <span className="sr-only">Like</span>
            {likeCount}
          </Button>
        </>
      ) : (
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={isLikedState ? "text-red-500 dark:text-red-400" : ""}
              >
                {isLikedState ? (
                  <Heart className="mr-2 h-4 w-4 fill-pink-700" />
                ) : (
                  <Heart className="mr-2 h-4 w-4" />
                )}
                <span className="sr-only">Like</span>
                {likeCount}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Un Authorized</AlertDialogTitle>
                <AlertDialogDescription>
                  You can't like without being logged in.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => navigate("/login")}>
                  Continue to Login
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
};
