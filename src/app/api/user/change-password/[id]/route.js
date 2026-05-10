import connectDB from "@/app/lib/mongoose"
import User from "@/app/Models/User"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
export async function PUT(req,{params}){
  await connectDB()
    try {
      let {id} = await params
      let body = await req.json()
      let {username,oldpassword,Newpassword,RepeatPassword} = body
      console.log(body)
      const user = await User.findOne({username})
      if (!user) {
      return NextResponse.json({ message: "User not found" },{status:404});
}
       const isMatch = await bcrypt.compare(oldpassword, user.password);
     if (!isMatch) {
      return NextResponse.json(
        { message: "รหัสไม่ตรงกัน" },
        { status: 401 }
      );
    }
  if(Newpassword !== RepeatPassword){
    return NextResponse.json({message:"รหัสไม่ตรงกัน"},{status:401})
  }
  const hashPassword = await bcrypt.hash(Newpassword,10)
  user.password = hashPassword
  await user.save()
      return NextResponse.json({message:"Chaneg Password Successfully"})
    } catch (error) {
      return NextResponse.json({message:"Have A error on connect api " + error})
    }
  
}