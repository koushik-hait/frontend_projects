import { registerUser } from "@/apis/user";
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
import { registerSchema, registerType } from "@/types/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<registerType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess(data, variables, context) {
      console.log("mutation onSuccess", data);
      toast({
        variant: "default",
        title: "Registration Successfull",
        description: data?.data?.message || "Login Now",
      });
      form.reset();
      navigate("/login");
    },
    onError(
      error: AxiosError<{
        data: null;
        message: string;
        success: boolean;
        statusCode: number;
      }>
    ) {
      console.log("mutation onError", error);
      toast({
        variant: "destructive",
        title: "Registration Faild",
        description: error.response?.data.message || "Something went wrong!",
      });
    },
  });

  const onSubmit = async (values: registerType) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Your Username..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          Sign Up{" "}
          {mutation.isPending && (
            <span className="loading loading-spinner">.....</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
