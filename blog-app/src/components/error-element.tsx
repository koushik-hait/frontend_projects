import { useRouteError } from "react-router-dom";

export const ErrorElement = () => {
  const error: any = useRouteError();
  console.error("Error Boundary: ", error);
  return (
    <div>
      <h1 className="text-red-500">Error : Something Went Worng!!!</h1>
      <span>{error?.message}</span>
    </div>
  );
};
