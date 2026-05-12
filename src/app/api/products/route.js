import connectDB from "@/app/lib/mongoose";
import Product from "@/app/Models/Product";
import { requireAuth } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = await requireAuth();

  if (auth.response) {
    return auth.response;
  }

  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    console.error("FULL ERROR:", error);
    return NextResponse.json(
      { message: "Error fetching products", error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(req) {
  const auth = await requireAuth();

  if (auth.response) {
    return auth.response;
  }

  try {
    await connectDB();
    const body = await req.json();
    console.log("Received Data:", body);
    const newItem = new Product({ ...body, body });
    await newItem.save();
    return NextResponse.json({ message: "Success to Add Products" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something Erorr" }, { status: 400 });
  }
}
