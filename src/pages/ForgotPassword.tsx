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
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { axiosInstance } from "@/lib/axiosInstance";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please input a valid user id or an email address" }),
});

function ForgotPassword() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleBack = (e: any) => {
    e.preventDefault();
    navigate("/login");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axiosInstance.post(
        "/api/forgot-password",
        values
      );
      console.log(response);

      toast({
        variant: "default",
        description: "An email with further instruction has been sent",
      });

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        description: "Error handling request",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col border mt-10 mx-auto p-10 w-1/4 space-y-6 text-left rounded-xl shadow-md bgx-red-500"
      >
        <span className="text-center text-2xl font-bold ">
          Forgot your password
        </span>
        <span className="">
          Enter a valid email or user id to receive instructions on how to reset
          your password
        </span>

        {/* user id/email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID or Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Reset password</Button>
        <Button
          className="border border-black"
          variant="secondary"
          onClick={handleBack}
        >
          Go Back
        </Button>

        <Toaster />
      </form>
    </Form>
  );
}

export default ForgotPassword;
