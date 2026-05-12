import connectDB from "@/app/lib/mongoose";
import Order from "@/app/Models/Order";
import { requireAuth } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(_req, { params }) {
  const auth = await requireAuth();

  if (auth.response) {
    return auth.response;
  }

  await connectDB();
  try {
    const { id } = await params;
    const deleteOrder = await Order.findByIdAndDelete(new Object(id));
    if (!deleteOrder) {
      throw new Error("Not Found ID Try Again");
    }
    return NextResponse.json({ message: "DELETE Successfully" }, { status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: "Delete Error Try Again" }, { status: 400 });
  }
}

export async function GET(_req, { params }) {
  const auth = await requireAuth();

  if (auth.response) {
    return auth.response;
  }

  await connectDB();
  try {
    const { id } = await params;
    const order = await Order.findById(new Object(id));
    if (!order) {
      throw new Error("Not Found ID Try Again");
    }
    return NextResponse.json({ message: "GET Successfully", order }, { status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: "Delete Error Try Again" }, { status: 400 });
  }
}
