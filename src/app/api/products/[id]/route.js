import connectDB from "@/app/lib/mongoose";
import Product from "@/app/Models/Product";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(req,{params}) {
    await connectDB()
    try {
          // - รับพารามิเตอร์เข้าถึง id อาจจะใช้ consolg.log เรียกดูก่อนก็ได้ - //
      const {id} = await params
        //  console.log("params id =>", params.id)

        const deletedItem = await Product.findByIdAndDelete(new ObjectId(id));

        if(!deletedItem){
          return NextResponse.json({message : "item Not Found"},{ status:404})
        }

      return NextResponse.json({message : "Delete Succese"},{status:200})
    } catch (error) {

        if(error){
          console.error("error",error)
          return NextResponse.json({message : "Error "},{ status : 400})
         
        }
    }
}

export async function PUT(req,{params}) {
   await connectDB()
  try {
    const {id} =  await params
    const result = await req.json()
    const editproduct = await Product.findByIdAndUpdate(id,result,{new:true})
    console.log("updated:", editproduct)
    return NextResponse.json({message:"Edit Successfully"})
  } catch (error) {
    if(error){
      console.log("error",error)
    return NextResponse.json({message:"Error Edit",},{status:400})
    }
  }
  
}