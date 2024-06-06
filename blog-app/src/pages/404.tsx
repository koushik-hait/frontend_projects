import { TbError404 } from "react-icons/tb";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-black h-screen justify-center text-white">
      <center className="mt-24 m-auto">
        <TbError404 className="text-8xl text-gray-500 animate-pulse" />
        <div className=" tracking-widest mt-4">
          {/* <span className="text-gray-500 text-6xl block">
            <span>4 0 4</span>
          </span> */}
          <span className="text-gray-500 text-xl">
            Sorry, We couldn't find what you are looking for!
          </span>
        </div>
      </center>
      <center className="mt-6">
        <Link
          to={"/"}
          className="text-gray-200 font-mono text-xl bg-orange-500 p-3 rounded-md hover:shadow-md"
        >
          Go back{" "}
        </Link>
      </center>
    </div>
  );
};

export default NotFound;
