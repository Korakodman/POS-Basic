import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function unauthorizedResponse() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export function forbiddenResponse() {
  return NextResponse.json({ message: "Forbidden" }, { status: 403 });
}

function serverErrorResponse(message) {
  return NextResponse.json({ message }, { status: 500 });
}

export async function getAuthUser() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return null;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  try {
    return jwt.verify(token, jwtSecret);
  } catch {
    return null;
  }
}

export async function requireAuth() {
  try {
    const user = await getAuthUser();

    if (!user) {
      return { response: unauthorizedResponse() };
    }

    return { user };
  } catch (error) {
    return { response: serverErrorResponse(error.message) };
  }
}

export async function requireRole(roles) {
  const auth = await requireAuth();

  if (auth.response) {
    return auth;
  }

  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (!allowedRoles.includes(auth.user?.role)) {
    return { response: forbiddenResponse() };
  }

  return auth;
}
