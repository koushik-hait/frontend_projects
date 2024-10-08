import { registerUser } from "@/apis/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { registerSchema, registerType } from "@/types/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  //   const [previewUrl, setPreviewUrl] = useState<string>("");
  const form = useForm<registerType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "USER",
      //   avater: undefined,
    },
  });

  //   const imageRef = form.register("avater");

  const onSubmit = async (values: registerType) => {
    const res = await registerUser(values);
    console.log(res);
    if (res?.status == 201) {
      console.log(res);
      toast({
        variant: "default",
        title: "Signup successful",
        description: res.data.message,
      });
      form.reset();
      navigate("/login");
    } else {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: res?.data.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* <FormField
          control={form.control}
          name="avater"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Avatar>
                  <AvatarImage
                    className="w-24 h-24 rounded-full"
                    src={
                      previewUrl ? previewUrl : "https://placehold.it/100x100"
                    }
                    alt="Avater"
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </FormLabel>
              <FormControl>
                <Input
                  className="hidden"
                  type="file"
                  placeholder="Avater"
                  {...imageRef}
                  onChange={(e) => {
                    // console.log(e.target.files![0]);
                    setPreviewUrl(URL.createObjectURL(e.target.files![0]));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.isSubmitting ? (
          <Button type="button" className="text-center " disabled>
            <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
          </Button>
        ) : (
          <Button type="submit">Sign Up</Button>
        )}
      </form>
    </Form>
  );
};

export default SignupForm;
