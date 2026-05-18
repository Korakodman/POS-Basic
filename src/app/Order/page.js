"use client";

import { useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import useFetchData from "../hooks/useFetchData";

const formatCurrency = (value = 0) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 2,
  }).format(Number(value) || 0);

const formatDateTime = (value) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const getReceiptNo = (id = "") => `#${String(id).slice(-8).toUpperCase()}`;

const getPaymentLabel = (payment) => {
  if (payment === "qr") return "สแกน QR / โอนเงิน";
  if (payment === "cash") return "เงินสด";
  return payment || "-";
};

export default function Page() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const printRef = useRef(null);

  const { data, loading, error } = useFetchData("http://localhost:3000/api/orders");
  const orders = useMemo(() => {
    const orderList = data?.order || [];

    return [...orderList].sort(
      (firstOrder, secondOrder) =>
        new Date(secondOrder.createdAt).getTime() -
        new Date(firstOrder.createdAt).getTime()
    );
  }, [data]);

  const summary = useMemo(
    () => ({
      receipts: orders.length,
      revenue: orders.reduce((total, order) => total + (Number(order.total) || 0), 0),
      items: orders.reduce(
        (total, order) =>
          total +
          (order.items || []).reduce(
            (itemTotal, item) => itemTotal + (Number(item.qty) || 0),
            0
          ),
        0
      ),
    }),
    [orders]
  );

  const receiptItems = selectedOrder?.items || [];
  const receiptItemCount = receiptItems.reduce(
    (total, item) => total + (Number(item.qty) || 0),
    0
  );

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: selectedOrder
      ? `receipt-${getReceiptNo(selectedOrder._id).replace("#", "")}`
      : "receipt",
  });

  const handleView = (order) => {
    setSelectedOrder(order);
    setTimeout(() => handlePrint(), 100);
  };

  return (
    <main className="min-h-screen w-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl space-y-6">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-2xl shadow-slate-300/70 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                POS STORE
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                Order History
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                ตรวจสอบประวัติคำสั่งซื้อ ดูยอดขายรวม และพิมพ์ใบเสร็จรูปแบบใหม่ที่อ่านง่ายขึ้น
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-right backdrop-blur">
              <p className="text-sm text-slate-300">อัปเดตล่าสุด</p>
              <p className="text-lg font-bold">{formatDateTime(new Date())}</p>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">จำนวนใบเสร็จ</p>
            <p className="mt-2 text-3xl font-black text-slate-950">{summary.receipts}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">ยอดขายรวม</p>
            <p className="mt-2 text-3xl font-black text-emerald-600">
              {formatCurrency(summary.revenue)}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">สินค้าที่ขายแล้ว</p>
            <p className="mt-2 text-3xl font-black text-blue-600">{summary.items} ชิ้น</p>
          </div>
        </section>

        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/80">
          <div className="flex flex-col gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-black">รายการคำสั่งซื้อ</h2>
              <p className="text-sm text-slate-500">เรียงจากรายการล่าสุดไปเก่าสุด</p>
            </div>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-500">กำลังโหลดข้อมูลคำสั่งซื้อ...</div>
          ) : error ? (
            <div className="p-10 text-center text-red-500">ไม่สามารถโหลดข้อมูลได้: {error}</div>
          ) : orders.length === 0 ? (
            <div className="p-10 text-center text-slate-500">ยังไม่มีคำสั่งซื้อในระบบ</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Receipt</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4 text-center">Items</th>
                    <th className="px-5 py-4">Payment</th>
                    <th className="px-5 py-4 text-right">Total</th>
                    <th className="px-5 py-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => {
                    const orderItems = order.items || [];
                    const itemCount = orderItems.reduce(
                      (total, item) => total + (Number(item.qty) || 0),
                      0
                    );

                    return (
                      <tr key={order._id} className="transition hover:bg-amber-50/60">
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-950">{getReceiptNo(order._id)}</div>
                          <div className="text-xs text-slate-400">{order._id}</div>
                        </td>
                        <td className="px-5 py-4 text-slate-600">
                          {formatDateTime(order.createdAt)}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">
                            {itemCount} ชิ้น
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                            {getPaymentLabel(order.OptionPayment)}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right text-lg font-black text-slate-950">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <button
                            className="rounded-full bg-slate-950 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-amber-200"
                            onClick={() => handleView(order)}
                            type="button"
                          >
                            Print Receipt
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>

      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: 0 }}>
        <div
          ref={printRef}
          className="bg-white p-6 text-slate-950"
          style={{ width: "380px", fontFamily: "Arial, sans-serif" }}
        >
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Receipt</p>
            <h2 className="mt-2 text-2xl font-black">POS STORE</h2>
            <p className="mt-1 text-xs text-slate-500">เบอร์ติดต่อ : 088-567-2###</p>
          </div>

          <div className="my-4 border-y border-dashed border-slate-300 py-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">เลขที่ใบเสร็จ</span>
              <span className="font-bold">{getReceiptNo(selectedOrder?._id)}</span>
            </div>
            <div className="mt-1 flex justify-between gap-4">
              <span className="text-slate-500">วันที่</span>
              <span className="text-right font-bold">{formatDateTime(selectedOrder?.createdAt)}</span>
            </div>
            <div className="mt-1 flex justify-between gap-4">
              <span className="text-slate-500">ชำระด้วย</span>
              <span className="font-bold">{getPaymentLabel(selectedOrder?.OptionPayment)}</span>
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-2 text-left font-bold">สินค้า</th>
                <th className="py-2 text-center font-bold">จำนวน</th>
                <th className="py-2 text-right font-bold">รวม</th>
              </tr>
            </thead>

            <tbody>
              {receiptItems.map((item, index) => {
                const lineTotal = (Number(item.price) || 0) * (Number(item.qty) || 0);

                return (
                  <tr key={item._id || `${item.name}-${index}`} className="border-b border-slate-100">
                    <td className="py-3 pr-2 align-top">
                      <p className="font-bold">{index + 1}. {item.name}</p>
                      <p className="text-xs text-slate-500">{formatCurrency(item.price)} / ชิ้น</p>
                    </td>
                    <td className="py-3 text-center align-top font-bold">{item.qty}</td>
                    <td className="py-3 text-right align-top font-bold">
                      {formatCurrency(lineTotal)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">จำนวนสินค้ารวม</span>
              <span className="font-bold">{receiptItemCount} ชิ้น</span>
            </div>
            <div className="flex justify-between border-t border-dashed border-slate-300 pt-3 text-lg">
              <span className="font-black">ยอดสุทธิ</span>
              <span className="font-black">{formatCurrency(selectedOrder?.total)}</span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-center">
            <p className="text-sm font-bold">ขอบคุณที่ใช้บริการ</p>
            <p className="mt-1 text-xs text-slate-500">กรุณาเก็บใบเสร็จไว้เป็นหลักฐานการชำระเงิน</p>
          </div>
        </div>
      </div>
    </main>
  );
}
