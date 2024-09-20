import { Blog } from "@/types";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type PostCardProps = {
  post: Blog;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200">
      <Card className="">
        <CardHeader>
          <CardTitle></CardTitle>
          {/* <CardDescription>{post.description}</CardDescription> */}
        </CardHeader>
        <CardContent className="relative w-full h-80 md:h-64 lg:h-44">
          <Link to={`/post/${post._id}`}>
            <img
              className="w-full h-full object-center object-cover "
              src={post.coverImage}
              alt={post.title}
            />
          </Link>
        </CardContent>
        <CardFooter className="px-3 py-4 flex flex-col justify-start items-start h-80 md:h-64 lg:h-44">
          <div className="text-sm text-white flex flex-wrap">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                className="bg-orange-600 hover:text-gray-400 py-1 px-2 text-white rounded-lg m-1"
                to={`/tag/${tag.split("#")[1]}`}
              >
                {tag}
              </Link>
            ))}
          </div>
          <Link to={`/post/${post._id}`} className="hover:text-orange-600">
            <p className="text-base font-semibold text-gray-100 group-hover:text-orange-600">
              {post.title}
            </p>
          </Link>
        </CardFooter>
      </Card>
    </article>
  );
};

export default PostCard;
