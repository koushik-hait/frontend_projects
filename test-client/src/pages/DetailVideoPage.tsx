import VideoPlayer, { VideoPlayerProps } from "@/components/video/VideoPlayer";
import { expressApi } from "@/lib/axios-conf";
import { Video } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailVideoPage = () => {
  const { vid } = useParams();
  const [video, setVideo] = useState<Video>({} as Video);
  const [loader, setLoader] = useState<boolean>(false);
  const [videoSources, setVideoSources] = useState<
    { src: string; type: string }[]
  >([]);
  useEffect(() => {
    (async () => {
      setLoader(true);
      const response = await expressApi.get(`/video/watch/${vid}`);

      if (response?.status === 200) {
        console.log("Video fetched successfully");
        const res = response.data;
        setVideo(res.data);
        console.log("Video", video);
        setVideoSources([
          {
            src: `${response.data.data.video.playbackUrl}`,
            type: "application/x-mpegURL",
          },
          { src: `${response.data.data.video.url}`, type: "video/mp4" },
        ]);
        setLoader(false);
      } else if (response?.status === 404) {
        console.log("No video found");
        setLoader(false);
      } else {
        console.log("Something went wrong");
        setLoader(false);
      }
    })();
  }, [vid]);

  const videoProps: VideoPlayerProps = {
    theme: "forest", // 'city', 'fantasy', 'forest', 'sea'
    autoPlay: false,
    loop: false,
    width: 1080,
    height: 720,
    sources: videoSources,
    controlBar: {
      skipButtons: {
        forward: 5,
        backward: 5,
      },
    },
    playbackRates: [0.5, 1, 1.5, 2],
    disablePictureInPicture: false,
    onReady: () => {
      console.log("Video player is ready!");
    },
  };
  return (
    <div className="w-full flex justify-center items-center ">
      {loader && (
        <div className="w-[1080px] h-[720px] bg-slate-600 animate-pulse flex justify-center items-center text-9xl"></div>
      )}
      {!loader && <VideoPlayer {...videoProps} className="name" />}
    </div>
  );
};

export default DetailVideoPage;
