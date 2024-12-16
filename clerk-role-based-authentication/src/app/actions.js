"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function toggleUserRole() {
  try {
    // Get the current authenticated user
    const { userId } = await auth();
    
    if (!userId) {
      return { error: "Not authenticated" };
    }

    // Fetch the current user
    const user = await currentUser();
    
    // Determine new role, with fallback
    const currentRole = user.publicMetadata?.role || "user";
    const newRole = currentRole === "admin" ? "user" : "admin";

    // Update user with new role
    const client = await clerkClient();
    const updatedUser = await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: newRole
      }
    });

    // Revalidate the page to reflect the updated role
    revalidatePath("/");


    // Return success message
    return { 
      success: true, 
      newRole: newRole,
      message: `Role changed from ${currentRole} to ${newRole}`
    };
  } catch (error) {
    console.error("Role Update Error:", {
      message: error.message,
      stack: error.stack
    });

    return { 
      error: "Failed to update role", 
      details: error.message
    };
  }
}
