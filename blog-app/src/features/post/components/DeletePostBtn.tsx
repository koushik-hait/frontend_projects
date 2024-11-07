import { expressApi } from "@/lib/axios-conf";
import React from "react";
import { Button } from "../../../components/ui/button";

interface Props {
  pid: string;
}
const DeletePostBtn: React.FC<Props> = ({ pid }) => {
  const deletePost = async () => {
    const response = await expressApi.delete(`/blog/delete/${pid}`);
    if (response?.status === 200) {
      console.log("Post deleted successfully");
    } else if (response?.status === 404) {
      console.log("No blog found");
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <Button onClick={deletePost} className="bg-red-500">
      Delete
    </Button>
  );
};

export default DeletePostBtn;
