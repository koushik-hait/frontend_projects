import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { expressApi } from "@/lib/axios-conf";
import { Video } from "@/types/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllVideoPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    setLoader(true);
    (async () => {
      const response = await expressApi.get("/video/all-video");
      if (response?.status === 200) {
        console.log("All video fetched successfully");
        const res = response.data;
        setVideos(res.data);
        setLoader(false);
      } else if (response?.status === 404) {
        console.log("No video found");
        setLoader(false);
      } else {
        console.log("Something went wrong");
        setLoader(false);
      }
    })();
  }, []);

  return (
    <div className="w-full m-5 grid grid-flow-row grid-cols-5 gap-3">
      <div className="col-span-5">All Video</div>
      {loader && <div>Loading...</div>}
      {!loader &&
        videos.map((video) => {
          return (
            <Link to={`/watch/${video._id}`} key={video._id}>
              <Card>
                <CardContent>
                  {/* <video src={video.videoUrl} controls></video> */}
                  <img src={video.thumbnail.original.url} alt="" />
                </CardContent>
                <CardFooter>
                  <CardTitle className="text-balance">{video.title}</CardTitle>
                  <p>{video.createdAt.split("T")[0]}</p>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
    </div>
  );
};

export default AllVideoPage;
