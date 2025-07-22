"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/lib/mutations";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .max(100, { message: "Email must not exceed 100 characters." })
    .email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

interface LoginResponse {
  loginUser: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { reset, setValue } = form;

  // GraphQL Mutation to log in the user
  const [loginUser] = useMutation<LoginResponse>(LOGIN_USER, {
    onCompleted: (data) => {
      // Store tokens in localStorage
      localStorage.setItem("accessToken", data.loginUser.accessToken);
      localStorage.setItem("refreshToken", data.loginUser.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.loginUser.user));

      // Reset form
      reset();

      // Redirect to home page
      router.push("/home");
    },
    onError: (error) => {
      console.error("Login failed. Please try again.", error);
      setLoginError("Login failed. Please try again.");

      // Clear only password field on unsuccessful login
      setValue("password", "");
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await loginUser({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      });
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col items-center p-4"
        >
          {/* Email Address */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md font-bold text-black dark:text-white">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    {...field}
                    className="w-full bg-transparent border-2 border-primary rounded-lg py-5 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </FormControl>

                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-4 w-full">
                <FormLabel className="text-md font-bold text-black dark:text-white">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="bg-transparent border-2 border-primary rounded-lg py-5 focus:outline-none"
                  />
                </FormControl>

                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" variant="default" size="lg" className="mt-6 w-full cursor-pointer">
            Log In
          </Button>
        </form>
      </Form>
    </>
  );
}
