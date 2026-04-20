import connectDB from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/app/Models/User";

export async function GET(request) {
    await connectDB()
    try {
        const res = NextResponse.redirect(new URL("/login",request.url),{status:302})
        res.cookies.set("token","",{
            httpOnly:true,
            path:"/",
            expires: new Date(0),
        })
        return res
    } catch (error) {
      if(error){
         console.log("error",error)
        throw new Error("Error to Logout",error)
      }
    }
    return NextResponse.json({"message":"Something Error try Again"},{status:400})
}