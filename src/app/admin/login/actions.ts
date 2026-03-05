"use server";

import { prisma } from "@/lib/prisma";
import { login } from "@/lib/auth";

export async function loginAction(email: string, password: string) {
  "use server";

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return { success: false, error: "Invalid credentials" };
    }

    // In a real app, use bcrypt to compare hashed passwords.
    // For this setup, we'll do a direct comparison as requested.
    if (admin.password !== password) {
      return { success: false, error: "Invalid credentials" };
    }

    await login(email);
    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function logoutAction() {
  "use server";
  try {
    const { logout } = await import("@/lib/auth");
    await logout();
    return { success: true };
  } catch (error) {
    console.error("Logout Error:", error);
    return { success: false };
  }
}
