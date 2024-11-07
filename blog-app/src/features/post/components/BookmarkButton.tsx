import { expressApi } from "@/lib/axios-conf";
import { useAuthStore } from "@/lib/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
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

type BookmarkButtonProps = {
  isBookmarked: boolean;
  bookmarks?: number;
  postId?: string;
};

const addBookmark = async (postId: string) => {
  const { data } = await expressApi.post(`blog/bookmark/p/${postId}`);
  return data;
};

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  isBookmarked,
  bookmarks,
  postId,
}) => {
  const [isBookmarkedState, setIsBookmarkedState] = useState(isBookmarked);
  const [bookmarkCount, setBookmarkCount] = useState(bookmarks);
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: addBookmark,
    onSuccess: (data) => {
      console.log(data);
      setIsBookmarkedState(data.data.isBookmarked);
      setBookmarkCount(data.data.bookmarks);
      toast({
        variant: "default",
        title: "Bookmark successful",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Bookmarking failed",
      });
    },
  });
  const onClick = async () => {
    if (!user) {
      // alert("You can't like without being logged in.");
      return;
    }
    //call api
    mutation.mutate(postId!);
    setBookmarkCount(mutation.data.data.bookmarks);
  };
  return (
    <>
      {isAuthenticated ? (
        <>
          {" "}
          <Button variant="ghost" size="sm" onClick={onClick}>
            {isBookmarkedState ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            {bookmarkCount}
          </Button>
        </>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm">
              {isBookmarkedState ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              {bookmarkCount}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Not logged in</AlertDialogTitle>
              <AlertDialogDescription>
                You must be logged in to bookmark posts.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onAbort={() => navigate("/login")}>
                Login now
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
