"use client";

import {
  ArrowUpRight,
  BarChart3,
  Clock3,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { useMemo } from "react";
import useFetchData from "./hooks/useFetchData";

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const formatDateTime = (value) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const getReceiptNo = (id = "") => `#${String(id).slice(-8).toUpperCase()}`;

const getItemCount = (order) =>
  (order?.items || []).reduce((total, item) => total + (Number(item.qty) || 0), 0);

const getTopProduct = (orders) => {
  const productMap = new Map();

  orders.forEach((order) => {
    (order.items || []).forEach((item) => {
      const name = item.name || item.productName || item.title || "สินค้าไม่ระบุชื่อ";
      const currentQty = productMap.get(name) || 0;
      productMap.set(name, currentQty + (Number(item.qty) || 0));
    });
  });

  const [topProduct] = [...productMap.entries()].sort((a, b) => b[1] - a[1]);
  return topProduct ? { name: topProduct[0], qty: topProduct[1] } : null;
};

export default function Home() {
  const { data, loading, error } = useFetchData("http://localhost:3000/api/orders");

  const orders = useMemo(() => {
    const orderList = data?.order || [];

    return [...orderList].sort(
      (firstOrder, secondOrder) =>
        new Date(secondOrder.createdAt).getTime() - new Date(firstOrder.createdAt).getTime(),
    );
  }, [data]);

  const todayOrders = useMemo(() => {
    const today = new Date().toDateString();
    return orders.filter((order) => new Date(order.createdAt).toDateString() === today);
  }, [orders]);

  const summary = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
    const todayRevenue = todayOrders.reduce(
      (sum, order) => sum + (Number(order.total) || 0),
      0,
    );
    const soldItems = orders.reduce((sum, order) => sum + getItemCount(order), 0);

    return {
      revenue,
      todayRevenue,
      soldItems,
      receipts: orders.length,
      topProduct: getTopProduct(orders),
    };
  }, [orders, todayOrders]);

  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      title: "ยอดขายรวม",
      value: formatCurrency(summary.revenue),
      detail: `${summary.receipts} ใบเสร็จทั้งหมด`,
      icon: WalletCards,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "ยอดขายวันนี้",
      value: formatCurrency(summary.todayRevenue),
      detail: `${todayOrders.length} ออเดอร์วันนี้`,
      icon: BarChart3,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "สินค้าที่ขายแล้ว",
      value: `${summary.soldItems} ชิ้น`,
      detail: summary.topProduct
        ? `ขายดี: ${summary.topProduct.name} (${summary.topProduct.qty} ชิ้น)`
        : "รอข้อมูลสินค้าขายดี",
      icon: PackageCheck,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  return (
    <main className="min-h-screen w-screen bg-slate-100 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-300/70">
          <div className="relative isolate p-6 md:p-8 lg:p-10">
            <div className="absolute right-0 top-0 -z-10 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 -z-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-200 backdrop-blur">
                  <Sparkles size={16} />
                  POS Portfolio Dashboard
                </div>
                <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
                  ภาพรวมร้านที่ดูสะอาด ใช้งานง่าย และพร้อมโชว์ผลงาน
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  ตัดข้อมูลที่ยังไม่จำเป็นออก และเน้นตัวเลขสำคัญ เช่น ยอดขาย ออเดอร์ล่าสุด
                  และสินค้าที่ขายแล้ว เพื่อให้หน้า Home ดูเป็นระบบมากขึ้นสำหรับ portfolio
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur md:min-w-[280px]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-300">อัปเดตล่าสุด</p>
                    <p className="mt-1 text-xl font-bold">{formatDateTime(new Date())}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 text-slate-950">
                    <Clock3 size={24} />
                  </div>
                </div>
                <div className="mt-6 rounded-2xl bg-white p-4 text-slate-950">
                  <p className="text-sm font-medium text-slate-500">รายรับเฉลี่ยต่อออเดอร์</p>
                  <p className="mt-2 text-2xl font-black">
                    {formatCurrency(summary.receipts ? summary.revenue / summary.receipts : 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80"
                key={stat.title}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">{stat.title}</p>
                    <p className={`mt-3 text-3xl font-black ${stat.color}`}>{stat.value}</p>
                  </div>
                  <div className={`rounded-2xl p-3 ${stat.bg} ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-500">{stat.detail}</p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/80">
            <div className="flex flex-col gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black">ออเดอร์ล่าสุด</h2>
                <p className="text-sm text-slate-500">แสดงเฉพาะรายการล่าสุดเพื่อให้หน้าแรกอ่านง่าย</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                <ReceiptText size={16} />
                {recentOrders.length} รายการ
              </div>
            </div>

            {loading ? (
              <div className="p-10 text-center text-slate-500">กำลังโหลดข้อมูลคำสั่งซื้อ...</div>
            ) : error ? (
              <div className="p-10 text-center text-red-500">ไม่สามารถโหลดข้อมูลได้: {error}</div>
            ) : recentOrders.length === 0 ? (
              <div className="p-10 text-center text-slate-500">ยังไม่มีคำสั่งซื้อในระบบ</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left">
                  <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500">
                    <tr>
                      <th className="px-5 py-4">Receipt</th>
                      <th className="px-5 py-4">ยอดรวม</th>
                      <th className="px-5 py-4">จำนวนสินค้า</th>
                      <th className="px-5 py-4">สถานะ</th>
                      <th className="px-5 py-4">วันที่</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentOrders.map((order) => (
                      <tr className="transition hover:bg-slate-50" key={order._id}>
                        <td className="px-5 py-4 font-bold text-slate-900">
                          {getReceiptNo(order._id)}
                        </td>
                        <td className="px-5 py-4 font-semibold text-emerald-600">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="px-5 py-4 text-slate-600">{getItemCount(order)} ชิ้น</td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                            {order.status || "completed"}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-500">
                          {formatDateTime(order.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-50 p-3 text-amber-600">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black">Quick Insight</h2>
                  <p className="text-sm text-slate-500">สรุปสั้น ๆ สำหรับเจ้าของร้าน</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-500">ออเดอร์ล่าสุด</p>
                  <p className="mt-2 text-2xl font-black">
                    {recentOrders[0] ? getReceiptNo(recentOrders[0]._id) : "-"}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-500">สินค้าขายดี</p>
                  <p className="mt-2 text-lg font-black">
                    {summary.topProduct?.name || "ยังไม่มีข้อมูล"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-xl shadow-emerald-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-100">
                    Portfolio Note
                  </p>
                  <h2 className="mt-3 text-2xl font-black">ออกแบบให้ดูเป็น product จริง</h2>
                </div>
                <ArrowUpRight size={28} />
              </div>
              <p className="mt-4 text-sm leading-6 text-emerald-50">
                หน้า Home ใหม่ลดการ์ดแจ้งเตือนจำลอง และเปลี่ยนเป็นข้อมูลที่ดึงจากออเดอร์จริง
                ทำให้สื่อสารความสามารถของระบบ POS ได้ชัดเจนขึ้น
              </p>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}
