import { loginUser } from "@/apis/user";
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
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/lib/store/authStore";
import { LocalStorageManager } from "@/lib/utils";
import { loginSchema, loginType } from "@/types/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

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

  const onSubmit = async (values: loginType) => {
    const res = await loginUser(values);
    // console.log(res);
    if (res?.status == 200) {
      const token = res.data.data.accessToken;
      LocalStorageManager.setValue("token", token);
      login(res.data.data.user);
      toast({
        variant: "default",
        title: "Login successful",
        description: res.data.message,
      });
      navigate("/");
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: res?.data.message,
      });
    }
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
              <Link to={"/forget-password"} className="text-right">
                forget password?
              </Link>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.isSubmitting ? (
          <Button type="button" className="text-center w-full " disabled>
            <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
          </Button>
        ) : (
          <Button type="submit">Login</Button>
        )}
      </form>
    </Form>
  );
};

export default LoginForm;
