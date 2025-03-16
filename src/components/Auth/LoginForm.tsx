"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm({ onSuccess }: { onSuccess: () => void; }) {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async () => {
    setIsError(false);
    setErrorMessage("");

    const isValidForm = form.formState.isValid;
    if (!isValidForm) {
      setIsError(true);
      setErrorMessage("Invalid form");
      return;
    }

    try {
      const response = await fetch("/api/auth/[...nextauth]", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.getValues()),
      });

      const data = await response.json();
      if (data.success) {
        router.refresh();
        onSuccess();
      } else {
        setIsError(true);
        setErrorMessage(data.error || "登入失敗");
      }
    } catch (error) {
      console.error("登入請求錯誤:", error);
      setIsError(true);
      setErrorMessage("發生錯誤，請稍後再試");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {isError && <p className="text-red-500">{errorMessage}</p>}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="please type your email" {...field} />
              </FormControl>
              <FormDescription>
                It will be used to login.
              </FormDescription>
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
                <Input placeholder="please type your password" {...field} type="password" />
              </FormControl>
              <FormDescription>
                It will be used to login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

