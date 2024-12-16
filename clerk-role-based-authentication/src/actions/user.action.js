"use server";

import { connectToDatabase } from "@/db";
import User from "@/modals/user.modal";


export async function createUser(user) {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}