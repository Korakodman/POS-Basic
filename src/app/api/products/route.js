import connectDB from "@/app/lib/mongoose";
import Product from "@/app/Models/Product";
import { NextResponse } from "next/server";
export async function GET() {
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
  try {
    await connectDB();
    let body = await req.json()
        console.log("Received Data:", body);
    let newItem = new Product({...body,body})
    await newItem.save()
    return NextResponse.json({message:"Success to Add Products"},{status:200});
  } catch (error) {
  return NextResponse.json(
    console.log(error),
    { message: "Something Erorr",},
    { status: 400 }
  );
}
}
