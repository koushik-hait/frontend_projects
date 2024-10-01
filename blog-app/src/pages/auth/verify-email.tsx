"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState<
    "verifying" | "success" | "error"
  >("verifying");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      // In a real application, you would send the token to your API
      const token = searchParams.get("token");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // For demonstration, we'll consider the verification successful if a token exists
      if (token) {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            We're confirming your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {verificationStatus === "verifying" && (
            <Alert>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <AlertTitle>Verifying</AlertTitle>
              <AlertDescription>
                Please wait while we verify your email address.
              </AlertDescription>
            </Alert>
          )}
          {verificationStatus === "success" && (
            <Alert>
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your email has been successfully verified.
              </AlertDescription>
            </Alert>
          )}
          {verificationStatus === "error" && (
            <Alert>
              <XCircle className="mr-2 h-4 w-4 text-red-500" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                We couldn't verify your email. The link may be invalid or
                expired.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          {verificationStatus !== "verifying" && (
            <Button className="w-full" asChild>
              <Link to="/login">
                {verificationStatus === "success"
                  ? "Proceed to Login"
                  : "Try Again"}
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
