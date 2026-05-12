import connectDB from "@/app/lib/mongoose";
import Order from "@/app/Models/Order";
import Product from "@/app/Models/Product";
import { requireAuth } from "@/app/lib/auth";
import { NextResponse } from "next/server";

// {
//     "userId": "1234",
//     "items" :[{
//       "productId": "65prod001",
//       "qty": 2,
//       "discount": 0
//     }],
//     "OptionPayment":"cash"
// }
export async function GET() {
  const auth = await requireAuth();

  if (auth.response) {
    return auth.response;
  }

  await connectDB();
  try {
    const order = await Order.find({});
    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error Fetch Order", error }, { status: 400 });
  }
}

export async function POST(req) {
  const auth = await requireAuth();

  if (auth.response) {
    return auth.response;
  }

  await connectDB();

  try {
    const body = await req.json();
    const { userId, items, OptionPayment } = body;
    if (!userId || !items || items.length === 0) {
      throw new Error("Invalid order data");
    }

    const orderItem = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item._id);

      if (!product) {
        throw new Error("Product Not Found");
      }
      if (product.stock < item.qty) {
        throw new Error(`Stock not enough for ${product.name}`);
      }
      const itemTotal = (product.price - (item.discount || 0)) * item.qty;

      total += itemTotal;

      orderItem.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        qty: item.qty,
        discount: item.discount || 0,
      });
      product.stock -= item.qty;
      await product.save();
    }

    const order = await Order.create([
      {
        userId,
        items: orderItem,
        total,
        OptionPayment: OptionPayment || "cash",
        status: "ชำระแล้ว",
      },
    ]);

    return NextResponse.json(order[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
