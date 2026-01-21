"use client";
import React from "react";
import { Form } from "react-aria-components";
import { FormRegis } from "../component/loginComponent/FormRegis";
function page() {
  return (
    <main className="flex justify-center border-2 bg-cyan-600 h-screen w-screen  items-center">
      <section className=" md:mb-0 mb-62.5">
        <header className="flex justify-center p-4">Logo</header>
         <FormRegis  />
      </section>
    </main>
  );
}

export default page;
