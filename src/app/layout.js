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
      user = jwt.verify(token, process.env.JWT_SECRET)
    }
  } catch {}
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100"><div className="flex min-h-screen">
          {user && <NavbarUI user={user}/>}
        <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
      </div></body>
    </html>
  )
}