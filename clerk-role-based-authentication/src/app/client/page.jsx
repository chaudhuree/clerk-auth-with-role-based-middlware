"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ClientPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  if (!isLoaded || !isSignedIn) {
    return null;
  }


  return (
    <div className="h-full flex flex-col items-center justify-center text-2xl">
      Hello, {user?.firstName} welcome to Clerk
    </div>
  );
};

export default ClientPage;