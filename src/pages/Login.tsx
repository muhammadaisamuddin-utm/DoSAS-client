import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import student_discussing from "../assets/student_discussing.svg";
import { useAuth } from "@/authContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { axiosInstance } from "@/lib/axiosInstance";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Input proper user id or email address" }),
  password: z.string(),
});

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();

  const getXsrfToken = async () => {
    try {
      await axiosInstance.get("/sanctum/csrf-cookie");
    } catch (error) {
      console.error("Error fetching XSRF token:", error);
    }
  };

  const togglePasswordVisibility = (e: any) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleForgotPassword = (e: any) => {
    e.preventDefault();
    navigate("/login/accountrecovery");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await getXsrfToken();

    try {
      const response = await axiosInstance.post("/api/login", values);

      if (response.status === 200) {
        login?.(response.data);
        navigate("/home");
        return;
      } else {
        toast({
          variant: "destructive",
          description: "Invalid credentials",
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        description: "Error logging in",
      });
    }
  };

  return (
    <div className="flex mx-auto w-screen h-screen justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col border mt-10 mx-5 p-10 w-1/4 space-y-6 text-left rounded-xl shadow-md"
        >
          <span className="text-2xl">Welcome!</span>
          <span className="text-3xl font-bold">Sign in to DoSAS</span>

          {/* user id/email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User ID or Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your user id or email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex relative">
                    <Input
                      className="grow w-full"
                      placeholder="Enter your password"
                      {...field}
                      type={isPasswordVisible ? "text" : "password"}
                    />
                    {isPasswordVisible ? (
                      <Eye
                        className="z-50 absolute flex h-full right-5 opacity-30 cursor-pointer"
                        onClick={(e) => togglePasswordVisibility(e)}
                      />
                    ) : (
                      <EyeOff
                        className="z-50 absolute flex h-full right-5 opacity-20 cursor-pointer"
                        onClick={(e) => togglePasswordVisibility(e)}
                      />
                    )}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2">
            <Checkbox id="remember-me" />
            <label
              htmlFor="remember-me"
              className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <Button type="submit" className="text-md p-7">
            Login
          </Button>

          <div className="text-center">
            <span className="text-gray-500">Forgot password? </span>
            <button className="font-bold" onClick={handleForgotPassword}>
              Click here
            </button>
          </div>
        </form>
      </Form>
      <img className="mx-5" src={student_discussing} alt="Student group" />
      <Toaster />
    </div>
  );
}

export default Login;
