import connectDB from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/app/Models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { username, password, repeatPassword } = body;

    const existUser = await User.findOne({ username });
    if (existUser) {
      return NextResponse.json(
        { message: "ผู้ใช้ซ้ำแล้วครับ" },
        { status: 422 }
      );
    }

    if (password !== repeatPassword) {
      return NextResponse.json(
        { message: "รหัสไม่ตรงกัน" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();


   const response = NextResponse.json(
         { message: "RegisterSuccess" },
         { status: 200 }
       );
   return response
   
  } catch (error) {
    console.error(error); 

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 } 
    );
  }
}