import connectDB from "@/app/lib/mongoose";
import User from "@/app/Models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
  await  connectDB()
   let user = await User.find({})
   return NextResponse.json({user},{status:200})
  } catch (error) {
    return NextResponse.json({message:"Error Get user"},{status:400})
  }
}