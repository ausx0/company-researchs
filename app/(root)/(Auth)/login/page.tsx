"use client";
import { motion } from "framer-motion";
import react, { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Login } from "../../../services/auth";
import toast from "react-hot-toast";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { AbilityContext } from "@/app/Rules/Can";
import { defineAbilitiesFor } from "@/app/Rules/defineAbility";
import { createMongoAbility } from "@casl/ability";
import { useAuth } from "@/app/hooks/useAuth";

const formSchema = z.object({
  Username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  Password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const LoginPage = () => {
  const router = useRouter(); // ✅ Now we have type-safety and autocompletion
  const [loading, setLoading] = useState(false);
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      if (data.Session_key) {
        toast.success("Login Success");
      } else {
        throw new Error("Login failed");
      }
      setLoading(true);
    },
    onError: (error) => {
      toast.error(error.message);
      setLoading(false);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Username: "",
      Password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    loginMutation.mutate(values);
    // try {
    //   login(values);
    //   console.log(values);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-10 rounded-xl shadow-lg space-y-8"
      >
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </motion.div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="Username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="ahmed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? (
                  <Spinner /> // Replace with your spinner component
                ) : (
                  "Sign in"
                )}
              </motion.button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
