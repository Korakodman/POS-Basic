import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import "./globals.css";
import NavbarUI from "./component/navbar/navbar";

export default async function RootLayout({ children }) {
  const cookieStore = await cookies() 
  const token = cookieStore.get("token")?.value

  let user = null
  try {
    if (token) {
      user = jwt.verify(token, "SECRET_KEY")
    }
  } catch {}

  return (
    <html lang="en">
      <body className="flex">
        {user && <NavbarUI />}
        {children}
      </body>
    </html>
  )
}