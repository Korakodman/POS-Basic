import connectDB from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/app/Models/User";


export async function POST(req) {
    await connectDB()
    try {
        let body = await req.json()
        let {username , password} = body
        let user = await User.findOne({username})
     
        if(!user || user.password != password ){
            return NextResponse.json({message:"รหัสหรือผู้ใช้ไม่ถูกต้อง"},{status:401})
        } 
        return NextResponse.json({message:"LoginSuccess"},{status:200})
    } catch (error) {
        return NextResponse.json("a Error is : ",error,{status:400})
    }
}
export async function GET(req) {
    await connectDB()
    try {
        console.log("GET LOGIN")
        return NextResponse.json({message:"GET"},{status:200})
    } catch (error) {
        return NextResponse.json("a Error is : ",error)
    }
}