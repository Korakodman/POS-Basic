import connectDB from "@/app/lib/mongoose";
import Product from "@/app/Models/Product";
import { NextResponse } from "next/server";
export async function GET() {
   console.log(process.env.URLDATABASE)
  try {
    await connectDB();
   
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products",error},
      { status: 500 }
    );
  }
}
