import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const CardSkeleton = () => {
  return (
    <Card className="w-96 bg-base-100 shadow-xl text-white">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-[250px]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[150px] w-[250px]" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-[250px]" />
      </CardFooter>
    </Card>
  );
};

export default CardSkeleton;
