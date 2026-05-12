import connectDB from "@/app/lib/mongoose";
import Product from "@/app/Models/Product";
import { requireAuth } from "@/app/lib/auth";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(_req, { params }) {
  const auth = await requireAuth();

  if (auth.response) {
    return auth.response;
  }

  await connectDB();
  try {
    // - รับพารามิเตอร์เข้าถึง id อาจจะใช้ consolg.log เรียกดูก่อนก็ได้ - //
    const { id } = await params;
    //  console.log("params id =>", params.id)

    const deletedItem = await Product.findByIdAndDelete(new ObjectId(id));

    if (!deletedItem) {
      return NextResponse.json({ message: "item Not Found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Delete Succese" }, { status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: "Error " }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  const auth = await requireAuth();

  if (auth.response) {
    return auth.response;
  }

  await connectDB();
  try {
    const { id } = await params;
    const body = await req.json();

    if (!body) {
      return NextResponse.json({ message: "Product Not Found" }, { status: 404 });
    }

    await Product.findByIdAndUpdate(new ObjectId(id), body, { new: true });
    return NextResponse.json({ message: "Edit Successfully" });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ message: "Error Edit" }, { status: 400 });
  }
}
