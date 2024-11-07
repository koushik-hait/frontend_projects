import { expressApi } from "@/lib/axios-conf";
import { useAuthStore } from "@/lib/store/authStore";
import useSocketStore from "@/lib/store/socketStore";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { toast } from "../../../components/ui/use-toast";

type FollowButtonProps = {
  followto: string;
  isFollowing: boolean;
};

export const FollowButton: React.FC<FollowButtonProps> = ({
  followto,
  isFollowing,
}) => {
  const [following, setFollowing] = useState(isFollowing);
  const { user } = useAuthStore();

  const onClick = async () => {
    if (followto && user) {
      const { data } = await expressApi.post(`blog/follow/${followto}`);
      console.log(data.data);
      setFollowing(data?.data?.following);
    } else {
      alert("You can't follow without being logged in.");
    }
  };
  return (
    <>
      {following ? (
        <Button variant="outline" onClick={onClick} size="sm">
          Unfollow
        </Button>
      ) : (
        <Button variant="outline" onClick={onClick} size="sm">
          Follow
        </Button>
      )}
    </>
  );
};
