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
    const allowedFields = ["name", "price", "stock", "category", "image", "ProductCode"];
    const productData = allowedFields.reduce((data, field) => {
      if (body[field] !== undefined) {
        data[field] = body[field];
      }
      return data;
    }, {});
    const requiredFields = ["name", "price", "stock", "category", "image", "ProductCode"];
    const missingFields = requiredFields.filter(
      (field) =>
        productData[field] === undefined ||
        productData[field] === null ||
        productData[field] === ""
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    if (typeof productData.price !== "number" || Number.isNaN(productData.price)) {
      return NextResponse.json(
        { message: "price must be a number" },
        { status: 400 }
      );
    }

    if (typeof productData.stock !== "number" || Number.isNaN(productData.stock)) {
      return NextResponse.json(
        { message: "stock must be a number" },
        { status: 400 }
      );
    }

    const newItem = new Product(productData);
    await newItem.save();
    return NextResponse.json({ message: "Success to Add Products" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something Error", error: error.message },
      { status: 400 }
    );
  }
}
