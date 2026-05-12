import connectDB from "@/app/lib/mongoose";
import User from "@/app/Models/User";
import { requireRole } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = await requireRole("admin");

  if (auth.response) {
    return auth.response;
  }

  try {
    await connectDB();
    const user = await User.find({});
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: "Error Get user" }, { status: 400 });
  }
}
