import { useAuthStore } from "@/lib/store/authStore";
import React, { ComponentType } from "react";
import { Link, useNavigate } from "react-router-dom";

interface WithAuthProps {
  isAuthenticated: boolean;
}

type Subtract<T, K> = Omit<T, keyof K>;

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<Subtract<P, WithAuthProps>> => {
  const WithAuth: React.FC<Subtract<P, WithAuthProps>> = (props) => {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    if (!isAuthenticated) {
      // navigate("/login");
      return (
        <div className="text-red-500 text-center text-3xl">
          You must be authenticated to access this page.
          <div>
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return WithAuth;
};

export default withAuth;
