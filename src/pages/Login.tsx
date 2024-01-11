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
import student_discussing from '../assets/student_discussing.svg';

const formSchema = z.object({
  email: z.string(),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex mx-auto w-screen h-screen justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col border mt-10 mx-5 p-10 w-1/4 space-y-6 text-left rounded-xl shadow-md bgx-red-500"
        >
          <span className="text-2xl">Welcome!</span>
          <span className="text-3xl font-bxold">Sign in to DoSAS</span>

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
                  <Input
                    placeholder="Enter your password"
                    {...field}
                    type="password"
                  />
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
            <span className="font-bold cursor-pointer">Click here</span>
          </div>
        </form>
      </Form>
        <img className="mx-5" src={student_discussing} alt="Student group"/>
    </div>
  );
}

export default Login;
