"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const ClientPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Strict role check for user
      if (user?.publicMetadata.role !== "user") {
        router.push("/");
      } else {
        setIsAuthorized(true);
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  // Show nothing until authorization check is complete
  if (!isLoaded || !isSignedIn || !isAuthorized) {
    return null;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center text-2xl">
      Hello, {user?.firstName} - this is a user page only
    </div>
  );
};

export default ClientPage;