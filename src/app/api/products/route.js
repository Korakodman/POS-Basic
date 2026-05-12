import connectDB from "@/app/lib/mongoose";
import Product from "@/app/Models/Product";
import { requireAuth } from "@/app/lib/auth";
import { NextResponse } from "next/server";

const allowedProductFields = ["name", "price", "stock", "category", "image", "ProductCode"];
const requiredProductFields = ["name", "price", "stock", "category", "image", "ProductCode"];

function buildProductPayload(body) {
  if (!body || Array.isArray(body) || typeof body !== "object") {
    return null;
  }

  return allowedProductFields.reduce((payload, field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }

    return payload;
  }, {});
}

function validateProductPayload(payload) {
  const missingFields = requiredProductFields.filter((field) => {
    return payload[field] === undefined || payload[field] === null || payload[field] === "";
  });

  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(", ")}`;
  }

  if (typeof payload.price !== "number" || Number.isNaN(payload.price)) {
    return "price must be a number";
  }

  if (typeof payload.stock !== "number" || Number.isNaN(payload.stock)) {
    return "stock must be a number";
  }

  return null;
}

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
    const productPayload = buildProductPayload(body);

    if (!productPayload) {
      return NextResponse.json({ message: "Invalid product data" }, { status: 400 });
    }

    const validationError = validateProductPayload(productPayload);

    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    const newItem = new Product(productPayload);
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
