import { UserProfile } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const { userId } = await auth();
  // if userId is truthy (i.e. not null, undefined, 0, etc.) then isAuth is true, otherwise it's false
  const isAuth = !!userId;
  const user = await currentUser();

  if (!isAuth) {
    redirect("/");
  }
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h1 className="text-2xl">{user?.username}</h1>
      <UserProfile />
    </div>
  );
}
