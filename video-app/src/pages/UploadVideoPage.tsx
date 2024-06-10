import withAuth from "@/components/WithAuth";
import UploadVideoForm from "@/components/forms/UploadVideoForm";
import React from "react";

const UploadVideoPage = () => {
  return (
    <div className="w-full flex justify-center text-white">
      <UploadVideoForm />
    </div>
  );
};

export default withAuth(UploadVideoPage);
