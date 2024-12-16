"use client";
import { useState } from "react";
import { toggleUserRole } from "./actions";

export default function RoleUpdateButton({ currentRole }) {
  const [status, setStatus] = useState("");
  const [role, setRole] = useState(currentRole || "user");

  const handleToggleRole = async () => {
    try {
      const result = await toggleUserRole();

      if (result.success) {
        setStatus(result.message || `Role updated to ${result.newRole}!`);
        setRole(result.newRole);
        // reload the application to reflect the updated role
        window.location.reload();
      } else {
        setStatus(result.error || "Failed to update role");
        console.error("Role Update Failed:", result);
      }
    } catch (error) {
      setStatus("Unexpected error occurred");
      console.error("Unexpected Role Update Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={handleToggleRole}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        {role === "admin" ? "Change Role to User" : "Change Role to Admin"}
      </button>
      {status && (
        <p
          className={`mt-2 ${
            status.includes("Failed") ? "text-red-600" : "text-green-600"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
