import SignupForm from "@/features/auth/forms/SignupForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <>
      <Card className="mx-auto max-w-md bg-black text-white my-24">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <Button variant="outline" className="w-full mt-3">
            Sign up with GitHub
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account? <Link to={"/login"}>Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
