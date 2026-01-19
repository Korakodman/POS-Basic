import connectDB from "@/app/lib/mongoose";
import Product from "@/app/Models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}
