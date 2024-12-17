"use client";
import { useUser } from "@clerk/nextjs";

export default function AdminPage() {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role;

  if (!user) {
    return <div className="h-full flex flex-col items-center justify-center text-2xl">Not Authenticated</div>;
  }

  if (userRole !== "admin") {
    return <div className="h-full flex flex-col items-center justify-center text-2xl">Access Denied: Admin Only</div>;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center text-2xl">
      Hello, Admin - this is an admin page
    </div>
  );
}
