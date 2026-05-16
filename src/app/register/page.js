"use client";

import { FormRegis } from "../component/loginComponent/FormRegis";

function page() {
  return (
    <main className="relative flex min-h-screen w-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.35),_transparent_35%)]" />
      <div className="absolute right-16 top-16 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />

      <section className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/20 bg-white/90 shadow-2xl shadow-cyan-950/40 backdrop-blur lg:grid-cols-[420px_1fr]">
        <div className="p-6 sm:p-10">
          <div className="mb-8 text-center lg:text-left">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-xl font-black text-teal-700 lg:mx-0">
              POS
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600">
              Create account
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">สมัครสมาชิก</h2>
            <p className="mt-2 text-sm text-slate-500">
              สร้างบัญชีพนักงานเพื่อเริ่มใช้งานระบบ POS Basic
            </p>
          </div>
          <FormRegis />
        </div>

        <div className="hidden flex-col justify-between bg-gradient-to-br from-teal-500 via-cyan-600 to-slate-900 p-10 text-white lg:flex">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-teal-100">
              POS Basic
            </p>
            <h1 className="text-4xl font-black leading-tight">
              เริ่มต้นระบบหลังร้านและหน้าร้านในที่เดียว
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-teal-50/90">
              บัญชีใหม่จะพร้อมสำหรับการจัดการสินค้า ตรวจสอบสต็อก และสร้างรายการขายผ่านหน้า POS
            </p>
          </div>

          <div className="rounded-3xl bg-white/15 p-6 backdrop-blur">
            <p className="text-sm font-semibold text-teal-50">Portfolio highlight</p>
            <p className="mt-2 text-2xl font-black">Auth + POS + Inventory</p>
            <p className="mt-2 text-sm leading-6 text-teal-50/85">
              โปรเจกต์นี้แสดง flow แบบ full-stack ตั้งแต่สมัครสมาชิก เข้าสู่ระบบ จัดการสินค้า ไปจนถึงสร้างออเดอร์
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default page;
