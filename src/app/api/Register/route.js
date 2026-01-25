import connectDB from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/app/Models/User";


export async function POST(req) {
    await connectDB()
try {
    let body = await req.json()
    let {username,password,repeatPassword} = body
    let ExisUser = await User.findOne({username: username})
    if(ExisUser){
       return NextResponse.json({message:"ผู้ใช้ซ้ำแล้วครับ"},{status:409})
    }
    if(password != repeatPassword){
        return NextResponse.json({message:"รหัสไม่ตรงกัน"},{status:409})
    }
    let newUser = new User({username,password})
    console.log(newUser)
     await newUser.save()
    return NextResponse.json(

        {message:"Register Success"},
        {status:200})
} catch (error) {
      return NextResponse.json({message:"Something Error"},console.log(error),{status:400})
}

}