import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/app/lib/mongoose";
import Order from "@/app/Models/Order";
import Product from "@/app/Models/Product";

//{
//     "UserId": "1234",
//     "items" :[{
//       "productId": "65prod001",
//       "qty": 2,
//       "discount": 0
//     }],
//     "OptionPayment":"cash"
// }//

export async function POST(req) {
  await connectDB();

  // เริ่มการบันทึกทุกอย่างจากนี้
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let body = await req.json();
    const { UserId, items, OptionPayment } = body;
    if (!UserId || !items || !items.length === 0) {
      throw new Error("Invalid order data");
    }

   let orderItem = [];
    let Total = 0;

    // for (const item in items) {
    //     orderItem.push(item)
    // }
    // console.log(orderItem)

    return NextResponse.json(body, { status: 200 });
  } catch (error) {
    console.log("Something Error :", error);
  }
}
