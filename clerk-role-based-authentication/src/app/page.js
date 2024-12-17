import { auth, currentUser } from "@clerk/nextjs/server";
import RoleUpdateButton from "./RoleUpdateButton";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-2xl">Home Page</h1>
      <div className="text-lg">
        Current Role: 
        <span className="font-bold ml-2">
          {user?.publicMetadata.role || "Not Set"}
        </span>
      </div>
      <RoleUpdateButton currentRole={user?.publicMetadata.role===undefined ? "not set" : user?.publicMetadata.role==="admin" ? "admin" : "user"} />
    </div>
  );
}
