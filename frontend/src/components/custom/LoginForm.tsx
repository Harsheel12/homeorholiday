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

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .max(100, { message: "Email must not exceed 100 characters." })
    .email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
  }

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
