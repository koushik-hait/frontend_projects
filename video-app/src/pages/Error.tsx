import React from "react";
import { useRouteError } from "react-router-dom";

export const Error = () => {
  const error = useRouteError();
  console.error("Error Boundary: ", error);
  return (
    <div className="text-center bg-red-500 text-white text-4xl">
      Error: Something Went Worng!!!
      <br />
      <pre>
        <code className="text-xl">{JSON.stringify(error, null, 2)}</code>
      </pre>
    </div>
  );
};
