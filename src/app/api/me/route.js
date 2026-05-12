import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function GET() {
  const token = (await cookies()).get("token")

  if (!token) {
    return Response.json({ user: null }, { status: 401 })
  }

  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    return Response.json(
      { error: "JWT_SECRET is not configured" },
      { status: 500 }
    )
  }

  try {
    const decoded = jwt.verify(token.value, jwtSecret)
    
    return Response.json({ user: decoded })
  } catch (err) {
    return Response.json({ user: null }, { status: 401 })
  }
}