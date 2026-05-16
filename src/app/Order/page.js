"use client";

import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import useFetchData from "../hooks/useFetchData";

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

const formatDateTime = (date) =>
  date
    ? new Date(date).toLocaleString("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "-";

const getPaymentLabel = (payment) => {
  if (payment === "cash") return "เงินสด";
  if (payment === "qr") return "QR Payment";
  return payment || "-";
};

export default function Page() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const printRef = useRef(null);

  const { data, loading, error } = useFetchData("/api/orders");
  const orders = data?.order || [];
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const paidOrders = orders.filter((order) => order.status === "ชำระแล้ว").length;
  const cancelledOrders = orders.filter((order) => order.status === "CANCELLED").length;

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: selectedOrder ? `receipt-${selectedOrder._id}` : "receipt",
  });

  const handleView = (order) => {
    setSelectedOrder(order);
    setTimeout(() => handlePrint(), 100);
  };

  return (
    <main className="min-h-screen w-screen bg-slate-100 p-4 text-slate-900 sm:p-6 lg:p-8">
      <section className="mx-auto max-w-7xl">
        <header className="mb-6 overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-700 p-6 text-white shadow-xl shadow-slate-300/60 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">
                Sales records
              </p>
              <h1 className="mt-3 text-3xl font-black sm:text-4xl">ประวัติออเดอร์</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200">
                ตรวจสอบรายการขายย้อนหลัง ดูสถานะการชำระเงิน และพิมพ์ใบเสร็จสำหรับลูกค้าได้จากหน้านี้
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 px-5 py-4 text-sm backdrop-blur">
              <span className="block text-slate-300">ยอดขายรวม</span>
              <strong className="text-2xl text-white">{formatCurrency(totalRevenue)} บาท</strong>
            </div>
          </div>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">ออเดอร์ทั้งหมด</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{orders.length}</p>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">ชำระแล้ว</p>
            <p className="mt-2 text-3xl font-black text-emerald-600">{paidOrders}</p>
          </div>
          <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">ถูกยกเลิก</p>
            <p className="mt-2 text-3xl font-black text-red-500">{cancelledOrders}</p>
          </div>
        </section>

        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
          <div className="flex flex-col gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">รายการใบเสร็จ</h2>
              <p className="text-sm text-slate-500">เลือก Print เพื่อพิมพ์ใบเสร็จรูปแบบใหม่</p>
            </div>
            <span className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-700">
              {orders.length} รายการ
            </span>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-500">กำลังโหลดข้อมูลออเดอร์...</div>
          ) : error ? (
            <div className="p-10 text-center text-red-500">ไม่สามารถโหลดข้อมูลออเดอร์ได้</div>
          ) : orders.length === 0 ? (
            <div className="p-10 text-center text-slate-500">ยังไม่มีรายการออเดอร์</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50 text-sm uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Receipt</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Payment</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Total</th>
                    <th className="px-5 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order._id} className="transition hover:bg-cyan-50/40">
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">#{order._id?.slice(-8).toUpperCase()}</p>
                        <p className="text-xs text-slate-400">{order._id}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{formatDateTime(order.createdAt)}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                        {getPaymentLabel(order.OptionPayment)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            order.status === "CANCELLED"
                              ? "bg-red-50 text-red-600"
                              : "bg-emerald-50 text-emerald-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-black text-slate-900">
                        {formatCurrency(order.total)} บาท
                      </td>
                      <td className="px-5 py-4 text-center">
                        <button
                          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:bg-cyan-700"
                          onClick={() => handleView(order)}
                        >
                          Print
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>

      {/* RECEIPT สำหรับพิมพ์ */}
      <div className="pointer-events-none absolute left-[-9999px] top-0 bg-white">
        <div ref={printRef} className="w-[80mm] bg-white p-4 font-mono text-[12px] leading-5 text-black">
          <header className="text-center">
            <h2 className="text-lg font-black tracking-wide">POS BASIC STORE</h2>
            <p>ใบเสร็จรับเงิน / Receipt</p>
            <p>โทร. 088-567-2###</p>
          </header>

          <div className="my-3 border-t border-dashed border-black" />

          <section className="space-y-1">
            <div className="flex justify-between gap-4">
              <span>เลขที่</span>
              <span className="text-right">#{selectedOrder?._id?.slice(-8).toUpperCase() || "-"}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>วันที่</span>
              <span className="text-right">{formatDateTime(selectedOrder?.createdAt)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>ชำระด้วย</span>
              <span>{getPaymentLabel(selectedOrder?.OptionPayment)}</span>
            </div>
          </section>

          <div className="my-3 border-t border-dashed border-black" />

          <table className="w-full">
            <thead>
              <tr className="border-b border-black">
                <th className="pb-1 text-left">สินค้า</th>
                <th className="pb-1 text-center">จำนวน</th>
                <th className="pb-1 text-right">รวม</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder?.items?.map((item, index) => {
                const lineTotal = (item.price - (item.discount || 0)) * item.qty;

                return (
                  <tr key={item._id || `${item.name}-${index}`} className="align-top">
                    <td className="py-1 pr-2">
                      <p>{index + 1}. {item.name}</p>
                      <p className="text-[10px]">@ {formatCurrency(item.price)} บาท</p>
                    </td>
                    <td className="py-1 text-center">{item.qty}</td>
                    <td className="py-1 text-right">{formatCurrency(lineTotal)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="my-3 border-t border-dashed border-black" />

          <section className="space-y-1 text-sm font-bold">
            <div className="flex justify-between">
              <span>ยอดสุทธิ</span>
              <span>{formatCurrency(selectedOrder?.total || 0)} บาท</span>
            </div>
            <div className="flex justify-between text-[11px] font-normal">
              <span>สถานะ</span>
              <span>{selectedOrder?.status || "-"}</span>
            </div>
          </section>

          <div className="my-3 border-t border-dashed border-black" />

          <footer className="text-center text-[11px]">
            <p>ขอบคุณที่ใช้บริการ</p>
            <p>กรุณาเก็บใบเสร็จไว้เป็นหลักฐาน</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
