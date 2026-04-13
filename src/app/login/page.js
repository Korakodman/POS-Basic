import React from "react";
import { Form } from "react-aria-components";
import { FormLogin } from "../component/loginComponent/FormLogin";
import { FormRegis } from "../component/loginComponent/FormRegis";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken"
 async function page() {
    const cookieStore = await cookies() 
    const token = cookieStore.get("token")?.value

      let user = null
    
  try {
      if (token) {
        user = jwt.verify(token, "SECRET_KEY")
        if(user){
        redirect("/")
        }
      }
    } catch {}
  return (
    <main className="flex justify-center border-2 bg-cyan-600 h-screen w-screen  items-center">
      <section className=" md:mb-0 mb-62.5">
        <header className="flex justify-center p-4">Logo</header>
        <FormLogin/>
      </section>
    </main>
  );
}

export default page;
