import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function GET() {
  const token = (await cookies()).get("token")

  if (!token) {
    return Response.json({ user: null }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token.value, "SECRET_KEY")
    
    return Response.json({ user: decoded })
  } catch (err) {
    return Response.json({ user: null }, { status: 401 })
  }
}