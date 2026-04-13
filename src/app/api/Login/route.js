import connectDB from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/app/Models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { username, password } = body;

    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { message: "รหัสหรือผู้ใช้ไม่ถูกต้อง" },
        { status: 401 }
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "รหัสหรือผู้ใช้ไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    const response = NextResponse.json(
      { message: "LoginSuccess" },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}