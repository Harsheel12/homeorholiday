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
import { REGISTER_USER } from "@/lib/mutations";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required." })
    .max(50, { message: "First name must not exceed 50 characters." }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required." })
    .max(50, { message: "Last name must not exceed 50 characters." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .max(100, { message: "Email must not exceed 100 characters." })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, { message: "Password must include at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must include at least one number." }),
});

interface RegisterResponse {
  registerUser: {
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

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { reset, setValue } = form;

  // GraphQL Mutation to register the user
  const [registerUser] = useMutation<RegisterResponse>(REGISTER_USER, {
    onCompleted: (data) => {
      // Store tokens in localStorage
      localStorage.setItem("accessToken", data.registerUser.accessToken);
      localStorage.setItem("refreshToken", data.registerUser.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.registerUser.user));

      // Reset form
      reset();

      // Redirect to home page
      router.push("/home");
    },
    onError: (error) => {
      console.error("Failed to register user. Please try again.", error);

      // Extract the actual error message
      const errorMessage =
        error.graphQLErrors?.[0]?.message ||
        error.message ||
        "Registration failed. Please try again.";

      setLoginError(errorMessage);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setLoginError(null);

    try {
      await registerUser({
        variables: {
          input: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          },
        },
      });
    } catch (error: any) {
      console.error("Registration failed. Please try again.", error);
      setLoginError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col items-center p-4"
        >
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md font-bold text-black dark:text-white">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    {...field}
                    className="bg-transparent border-2 border-primary rounded-lg py-5 focus:outline-none"
                  />
                </FormControl>

                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mt-4 w-full">
                <FormLabel className="text-md font-bold text-black dark:text-white">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    {...field}
                    className="bg-transparent border-2 border-primary rounded-lg py-5 focus:outline-none"
                  />
                </FormControl>

                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />

          {/* Email Address */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-4 w-full">
                <FormLabel className="text-md font-bold text-black dark:text-white">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    {...field}
                    className="w-full bg-transparent border-2 border-primary rounded-lg py-5 focus:outline-none"
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
            Sign Up
          </Button>
        </form>
      </Form>
    </>
  );
}
