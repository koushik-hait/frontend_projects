import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { expressApi } from "@/lib/axios-conf";
import { useAuthStore } from "@/lib/store/authStore";
import { LocalStore } from "@/lib/utils";
import { loginSchema, loginType } from "@/types/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../apis/user";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { toast } = useToast();
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // console.log("mutation onSuccess", data);
      const token = data.data.accessToken;
      LocalStore.set("token", token);
      login(data.data.user);
      toast({
        variant: "default",
        title: "Login successful",
        description: data.message,
      });
      form.reset();
      if (data.data.user.role == "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    },
    onError: (
      error: AxiosError<{
        data: null;
        message: string;
        statusCode: number;
        success: boolean;
      }>
    ) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.response?.data.message || "Something went wrong",
      });
      // console.log("mutation onError", error.response?.data.message);
    },
  });

  const onSubmit = async (values: loginType) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter Your Email..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter Your Password..."
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <Link to={"/forgot-password"} className="text-right">
                forget password?
              </Link>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={mutation.isPending} className="w-full">
          Sign in{" "}
          {mutation.isPending && (
            <span className="loading loading-spinner">.....</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
