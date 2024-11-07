import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link, useParams } from "react-router-dom";
import { expressApi } from "@/lib/axios-conf";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";

const passwordResetSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

const resetPassword = async (
  formData: PasswordResetFormValues,
  resetToken: string
) => {
  const { data } = await expressApi.post(`/user/reset-password/${resetToken}`, {
    ...formData,
  });
  return data;
};

export default function ResetPassword() {
  const { resetPasswordToken } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
  });

  const mutation = useMutation({
    mutationFn: (formData: PasswordResetFormValues) =>
      resetPassword(formData, resetPasswordToken as string),
    onSuccess: () => {
      setIsSuccess(true);
    },
    onError: () => {
      setIsSuccess(false);
    },
  });

  const onSubmit = (data: PasswordResetFormValues) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardContent>
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your password has been reset successfully.
              </AlertDescription>
            </Alert>
          </CardContent>
          <Button variant="ghost" className="w-full" asChild>
            <Link to="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back to Login
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your email and new password below.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("email")} />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("newPassword")}
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-500">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmNewPassword">Confirm Password</Label>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  {...register("confirmNewPassword")}
                />
                {errors.confirmNewPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
