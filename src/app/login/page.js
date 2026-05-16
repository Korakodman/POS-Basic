import { FormLogin } from "../component/loginComponent/FormLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

async function page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let user = null;

  try {
    if (token) {
      user = jwt.verify(token, process.env.JWT_SECRET);
      if (user) {
        redirect("/");
      }
    }
  } catch {}

  return (
    <main className="relative flex min-h-screen w-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.35),_transparent_35%)]" />
      <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />

      <section className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/20 bg-white/90 shadow-2xl shadow-cyan-950/40 backdrop-blur lg:grid-cols-[1fr_420px]">
        <div className="hidden flex-col justify-between bg-gradient-to-br from-cyan-500 via-blue-600 to-slate-900 p-10 text-white lg:flex">
          <div>
            <div className="mb-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl font-black shadow-lg backdrop-blur">
              POS
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-100">
              Store Management
            </p>
            <h1 className="text-4xl font-black leading-tight">
              จัดการร้านค้าและขายหน้าร้านได้ง่ายขึ้น
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-cyan-50/90">
              เข้าสู่ระบบเพื่อใช้งาน POS, จัดการสินค้า, ตรวจสอบออเดอร์ และดูภาพรวมยอดขายในร้านของคุณ
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-sm font-semibold">
            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              POS
              <span className="block text-xs font-normal text-cyan-100">Checkout</span>
            </div>
            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              Stock
              <span className="block text-xs font-normal text-cyan-100">Inventory</span>
            </div>
            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
              Orders
              <span className="block text-xs font-normal text-cyan-100">History</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mb-8 text-center lg:text-left">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-xl font-black text-cyan-700 lg:mx-0">
              POS
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-600">
              Welcome back
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">เข้าสู่ระบบ</h2>
            <p className="mt-2 text-sm text-slate-500">
              กรอกบัญชีของคุณเพื่อเข้าใช้งานระบบขายหน้าร้าน
            </p>
          </div>
          <FormLogin />
        </div>
      </section>
    </main>
  );
}

export default page;
