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
import axios from "axios";

const formSchema = z
  .object({
    newPassword: z.string().min(1),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: " ",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"]
  });

interface ResetPasswordProp {
  isFirstTime?: boolean;
}

function ResetPassword({ isFirstTime }: Readonly<ResetPasswordProp>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const body = {
      token: "",
      userid: "",
      password: values.newPassword,
      confirm_password: values.confirmPassword,
    };

    try {
      const response = await axios.post(
        "https://api.dosas.online/api/reset-password",
        body
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }

    toast({
      variant: "default",
      description: "Password updated successfully",
    });

    setTimeout(() => {
      //redirect
      navigate("/login");
    }, 3000);
  };

  const { toast } = useToast();

  const navigate = useNavigate();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col border mt-10 mx-auto p-10 w-1/4 space-y-6 text-left rounded-xl shadow-md bgx-red-500"
      >
        <span className="text-center text-2xl font-bold ">
          Reset your password
        </span>

        {isFirstTime && (
          <span className="text-gray-500">
            For first time login, user will be required to update the password.
          </span>
        )}

        {/* new password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter new password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* confirm password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Reset password</Button>
        <Button
          className="border border-black"
          variant="secondary"
          onClick={() => navigate("/login")}
        >
          Cancel
        </Button>

        <Toaster />
      </form>
    </Form>
  );
}

export default ResetPassword;
