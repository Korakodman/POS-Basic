import connectDB from "@/app/lib/mongoose";
import User from "@/app/Models/User";
import { requireRole } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const auth = await requireRole("admin");

  if (auth.response) {
    return auth.response;
  }

  await connectDB();
  try {
    const { id } = await params;
    const body = await req.json();

    if (!id) {
      throw new Error("Not Found ID try Again");
    }
    if (!body) {
      throw new Error("Data Not Found try Again");
    }

    await User.findByIdAndUpdate(id, body, { new: true });

    return NextResponse.json({ message: "Change User Successfully" });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "Error Edit" }, { status: 400 });
  }
}

export async function DELETE(_req, { params }) {
  const auth = await requireRole("admin");

  if (auth.response) {
    return auth.response;
  }

  await connectDB();
  try {
    const { id } = await params;

    if (!id) {
      throw new Error("Not Found ID try Again");
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json({ message: "Delete Successfully" });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "Error Edit" }, { status: 400 });
  }
}
