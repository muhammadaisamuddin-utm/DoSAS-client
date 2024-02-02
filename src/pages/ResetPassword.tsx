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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { axiosInstance } from "@/lib/axiosInstance";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(1)
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{8,16}$/g, {
        message:
          "Password must be 8 - 16 alphanumeric combination (include both alphabets and numbers)",
      }),
    confirmPassword: z
      .string()
      .min(1)
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{8,16}$/g, {
        message:
          "Password must be 8 - 16 alphanumeric combination (include both alphabets and numbers)",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: " ",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

interface ResetPasswordProp {
  isFirstTime?: boolean;
}

function ResetPassword({ isFirstTime }: Readonly<ResetPasswordProp>) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const email = searchParams.get("email");

  const { token } = useParams();

  const { toast } = useToast();

  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = (e: any) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = (e: any) => {
    e.preventDefault();
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleBack = (e: any) => {
    e.preventDefault();
    navigate("/login");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let body;

    if (isFirstTime) {
      body = {
        password: values.newPassword,
        confirm_password: values.confirmPassword,
      };
    } else {
      body = {
        token: token,
        userid: email,
        password: values.newPassword,
        confirm_password: values.confirmPassword,
      };
    }

    try {
      if (isFirstTime) {
        await axiosInstance.post("/api/first-reset-password", body);
      } else {
        await axiosInstance.post("/api/reset-password", body);
      }

      toast({
        variant: "default",
        description: "Password updated successfully",
      });

      setTimeout(() => {
        //redirect
        navigate("/login");
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
                <div className="flex relative">
                  <Input
                    className="grow w-full"
                    placeholder=""
                    {...field}
                    type={isPasswordVisible ? "text" : "password"}
                  />
                  {isPasswordVisible ? (
                    <Eye
                      className="z-50 absolute flex h-full right-5 opacity-30"
                      onClick={(e) => togglePasswordVisibility(e)}
                    />
                  ) : (
                    <EyeOff
                      className="z-50 absolute flex h-full right-5 opacity-30"
                      onClick={(e) => togglePasswordVisibility(e)}
                    />
                  )}
                </div>
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
                <div className="flex relative">
                  <Input
                    className="grow w-full"
                    placeholder=""
                    {...field}
                    type={isConfirmPasswordVisible ? "text" : "password"}
                  />
                  {isConfirmPasswordVisible ? (
                    <Eye
                      className="z-50 absolute flex h-full right-5 opacity-30"
                      onClick={(e) => toggleConfirmPasswordVisibility(e)}
                    />
                  ) : (
                    <EyeOff
                      className="z-50 absolute flex h-full right-5 opacity-30"
                      onClick={(e) => toggleConfirmPasswordVisibility(e)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Reset password</Button>
        {!isFirstTime && (
          <Button
            className="border border-black"
            variant="secondary"
            onClick={handleBack}
          >
            Cancel
          </Button>
        )}

        <Toaster />
      </form>
    </Form>
  );
}

export default ResetPassword;
