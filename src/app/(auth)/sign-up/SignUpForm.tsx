"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUp } from "./action";

import { PasswordInput } from "@/components/custom/PasswordInput";
import { ArrowLeft } from "lucide-react";
import LoadingButton from "@/components/custom/LoadingButton";
import { useToast } from "@/components/ui/use-toast";

const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: SignUpValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signUp(values);
      if (error) {
        setError(error);
        toast({
          variant: "destructive",
          description: "Failed to sign up. Please try again.",
        });
      }
    });
  }

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col gap-1"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username here..."
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
                    placeholder="Enter your email here..."
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
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 flex justify-between">
            <Button
              type="button"
              variant={"ghost"}
              className="hover:bg-red-500"
            >
              <Link href={"/"}>
                <ArrowLeft />
              </Link>
            </Button>
            <LoadingButton loading={isPending} type="submit">
              Submit
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
