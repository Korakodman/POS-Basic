import connectDB from "@/app/lib/mongoose";
import { NextResponse } from "next/server";



export async function POST(req) {
    await connectDB()
    try {
        let body = await req.json()
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