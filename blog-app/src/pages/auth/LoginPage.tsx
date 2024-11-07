import { Link } from "react-router-dom";

import LoginForm from "@/features/auth/forms/LoginForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const handleSocialLogin = async () => {
    const url = `${import.meta.env.VITE_BACKEND_EXPRESS_URI}/user/github`;
    window.location.href = url;
  };
  return (
    <Card className="mx-auto max-w-md bg-transparent text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <Button
          variant="outline"
          onClick={handleSocialLogin}
          className="w-full mt-3 text-orange-500"
        >
          Login with Github
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={"/signup"} className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
