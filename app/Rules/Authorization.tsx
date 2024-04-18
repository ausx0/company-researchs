"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";

type Role = "Admin" | "lab-tech" | "reception";

export const withAuthorization = (
  WrappedComponent: React.ComponentType,
  allowedRoles: Role[]
) => {
  const ComponentWithAuthorization = (props: any) => {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!user) {
        // If user data is not available yet, set loading to true and return
        setLoading(true);
        return;
      }

      // Once user data is available, check if user has the required role
      if (!allowedRoles.includes(user.role as Role)) {
        router.push("/home");
      } else {
        setLoading(false); // Set loading to false if user has the required role
      }
    }, [user, router, allowedRoles]);

    // Show loading indicator if user data is still loading
    if (loading) {
      return <div>Loading...</div>;
    }

    // If user data is loaded and user has the required role, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuthorization;
};
