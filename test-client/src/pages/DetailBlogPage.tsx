import { Editor } from "@/components/editor/BlockNoteEditor";
import { expressApi } from "@/lib/axios-conf";
import { Blog } from "@/types";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const DetailBlogPage = () => {
  const { bid } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoader(true);
      const response = await expressApi.get(`/blog/reading/${bid}`);
      if (response?.status === 200) {
        setBlog(response.data.data);
        setLoader(false);
      } else if (response?.status === 404) {
        console.log("No blog found");
        setLoader(false);
      } else {
        console.log("Something went wrong");
        setLoader(false);
      }
    })();
  }, [bid]);

  // const editor = useCreateBlockNote({ initialContent });

  return (
    <div className="w-full flex justify-center items-center ">
      {loader && (
        <div className="w-[1080px] h-[720px] bg-[#3a3737] animate-pulse flex justify-center items-center text-9xl text-white">
          Loading...
        </div>
      )}
      {!loader && (
        <div className="w-7xl flex flex-col justify-center items-center gap-4 bg-[#3f3f3f]">
          <h1 className="w-full text-slate-100 text-5xl text-center my-4">
            {blog?.title}
          </h1>
          <div className="w-7xl">
            <img
              src={blog?.coverImage}
              alt={blog?.title}
              className="w-full"
              width={1080}
              height={720}
            />
          </div>
          <div className="w-full ">
            <Editor
              initialContent={blog?.content}
              editable={false}
              onChange={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailBlogPage;
