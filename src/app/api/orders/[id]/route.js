import connectDB from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
import Order from "@/app/Models/Order";


export async function DELETE(req,{params}) {
   await connectDB()
   try {
    let {id} = await params
    let deleteOrder = await Order.findByIdAndDelete(new Object(id))
    if(!deleteOrder){
        throw new Error("Not Found ID Try Again")
    }
    return NextResponse.json({message:"DELETE Successfully"},{status:200})
   } catch (error) {
       console.error("error",error)
    return NextResponse.json({message:"Delete Error Try Again"},{status:400})
   }
}


export async function GET(req,{params}) {
   await connectDB()
   try {
    let {id} = await params
    let order = await Order.findById(new Object(id))
    if(!order){
        throw new Error("Not Found ID Try Again")
    }
    return NextResponse.json({message:"GET Successfully",order},{status:200})
   } catch (error) {
       console.error("error",error)
    return NextResponse.json({message:"Delete Error Try Again"},{status:400})
   }
}