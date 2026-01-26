import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarUI from "./component/navbar/navbar";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex" >
         <NavbarUI/>
        {children}
      </body>
    </html>
  );
}
