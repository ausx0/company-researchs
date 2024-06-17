"use client";
import { motion, useAnimation } from "framer-motion";
import react, { useContext, useEffect, useState } from "react";

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
import Image from "next/image";
import fullLogoIcon from "@/public/OreoLogoFullPNG.png";
import authImg from "@/public/auth-img.png";

const formSchema = z.object({
  Username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  Password: z.string(),
});

const LoginPage = () => {
  const router = useRouter(); // ✅ Now we have type-safety and autocompletion
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      if (data.Session_key) {
        toast.success("Login Success");
        setUser({ role: data.Scope }); // Update the user role
        router.refresh();
      } else {
        throw new Error("Login failed");
      }
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
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
  // Animation controls for clouds
  return (
    <div className="min-h-screen flex items-stretch text-white">
      <div
        style={{
          backgroundImage: `url(${authImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#000", // Add a background color
        }} // Use inline styles to set the background images
        className={`lg:flex w-1/2 flex items-center justify-center text-center`} // Add text-center here to center the text
      >
        <div className="bg-black bg-opacity-50 p-4 rounded">
          {" "}
          {/* Add this div to create a semi-transparent overlay for the text */}
          <h1 className="text-5xl font-bold text-white mb-4">Welcome Back!</h1>
          <p className="text-white text-opacity-70">
            To keep connected with us please login with your personal info
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center">
        <motion.div
          className="w-full max-w-md p-8 space-y-8"
          initial={{ y: -250 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <div className="flex justify-center items-center">
            <Image
              src={fullLogoIcon}
              alt=""
              className={`transition duration-800 ease-linear max-w-[50%] `}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            Sign in to your account
          </h2>
          <p className="text-gray-600 text-center">Enter your details below.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="Username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Username"
                          {...field}
                          className="mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                        />
                      </div>
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
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          className="mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
              >
                {loading ? <Spinner color="white" /> : "Sign in"}
              </motion.button>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
