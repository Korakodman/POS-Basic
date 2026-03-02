import connectDB from "@/app/lib/mongoose";
import Product from "@/app/Models/Product";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(req,{params}) {
    // - เชื่อมต่อฐานข้อมูลโดยส่ง env ไปตรงๆ - //
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