"use client";

import React, { useRef, useState } from "react";
import { FiCreditCard, FiDollarSign, FiPackage, FiSearch, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import ButtonUI from "../component/Button";
import ItemList from "../component/Item";
import { MoDalUI } from "../component/Modal";
import AlertUI from "../component/Alert";
import useFetchData from "../hooks/useFetchData";

const currencyFormatter = new Intl.NumberFormat("th-TH", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function formatCurrency(value) {
  return currencyFormatter.format(Number(value) || 0);
}

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [Alert, setalert] = useState(false);
  const [Cart, setCart] = useState([]);
  const Barcode = useRef(null);

  const { data = [], loading, error } = useFetchData("/api/products");

  function handleSelect(item) {
    setSelectedItem(item);
    setIsOpen(true);
  }

  function calculateTotal(cart) {
    return cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
  }

  function calculateItem(cart) {
    return cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  }

  function showNotFoundAlert() {
    setalert(true);
    setTimeout(() => {
      setalert(false);
    }, 2000);
  }

  function focusBarcodeInput() {
    if (Barcode.current) {
      Barcode.current.value = "";
      Barcode.current.focus();
    }
  }

  function addProductToCart(found) {
    setCart((prev) => {
      const exist = prev.find((item) => item.ProductCode === found.ProductCode);

      if (exist) {
        return prev.map((item) =>
          item.ProductCode === found.ProductCode ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...found, qty: 1 }];
    });
  }

  function handleEnter(e) {
    if (e.key !== "Enter") {
      return;
    }

    const barcode = Barcode.current.value.trim();

    if (!barcode) {
      return;
    }

    const found = data.find((product) => product.ProductCode === barcode);

    if (found) {
      addProductToCart(found);
      focusBarcodeInput();
      return;
    }

    showNotFoundAlert();
    focusBarcodeInput();
  }

  function updateQuantity(ProductCode, nextQty) {
    if (nextQty <= 0) {
      DeleteOption(ProductCode);
      return;
    }

    setCart((prev) =>
      prev.map((item) => (item.ProductCode === ProductCode ? { ...item, qty: nextQty } : item))
    );
  }

  function DeleteOption(ProductCode) {
    setCart((prev) => prev.filter((item) => item.ProductCode !== ProductCode));
  }

  const Item = calculateItem(Cart);
  const total = calculateTotal(Cart);

  return (
    <main className="min-h-screen w-full bg-slate-100 px-4 py-6 font-sans text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white shadow-2xl shadow-slate-300/70">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
            
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-200">POS Counter</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">ขายหน้าร้าน</h1>
                <p className="mt-2 text-sm text-slate-300">สแกนบาร์โค้ด เพิ่มสินค้า และรับชำระเงินได้ในหน้าเดียว</p>
              </div>
            </div>

            <div className="grid gap-3 rounded-3xl bg-white/10 p-4 ring-1 ring-white/15 sm:min-w-[420px]">
              <label htmlFor="barcode" className="text-sm font-semibold text-blue-100">
                สแกนหรือกรอกรหัสสินค้า
              </label>
              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-slate-900 shadow-inner">
                <FiSearch className="text-xl text-slate-400" aria-hidden="true" />
                <input
                  id="barcode"
                  className="w-full bg-transparent text-lg font-semibold outline-none placeholder:text-slate-400"
                  type="text"
                  placeholder="Scan barcode แล้วกด Enter"
                  ref={Barcode}
                  onKeyDown={handleEnter}
                  autoFocus
                />
              </div>
              <p className="text-xs text-slate-300">กด Enter หลังสแกน ระบบจะรวมจำนวนสินค้าเดิมให้อัตโนมัติ</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="overflow-hidden rounded-[2rem] border border-white bg-white shadow-xl shadow-slate-200">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">Cart</p>
                <h2 className="mt-1 text-2xl font-black">รายการสินค้า</h2>
              </div>
              <button
                type="button"
                onClick={() => setCart([])}
                disabled={Cart.length === 0}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-100 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiTrash2 aria-hidden="true" />
                ล้างตะกร้า
              </button>
            </div>

            <div className="hidden grid-cols-[minmax(0,1fr)_120px_140px_120px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-500 md:grid">
              <span>สินค้า</span>
              <span className="text-right">ราคา</span>
              <span className="text-center">จำนวน</span>
              <span className="text-right">รวม</span>
            </div>

            <section className="max-h-[520px] min-h-[360px] overflow-y-auto p-3">
              {loading ? (
                <div className="grid min-h-[320px] place-items-center rounded-3xl bg-slate-50 text-center">
                  <div>
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
                    <p className="mt-4 font-bold text-slate-600">กำลังโหลดสินค้า...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="grid min-h-[320px] place-items-center rounded-3xl bg-red-50 p-8 text-center text-red-700">
                  <div>
                    <p className="text-xl font-black">โหลดข้อมูลสินค้าไม่สำเร็จ</p>
                    <p className="mt-2 text-sm">กรุณาลองรีเฟรชหน้า หรือเข้าสู่ระบบใหม่อีกครั้ง</p>
                  </div>
                </div>
              ) : Cart.length === 0 ? (
                <div className="grid min-h-[320px] place-items-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <div className="max-w-sm">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-blue-100 text-3xl text-blue-700">
                      <FiShoppingCart aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-xl font-black">ยังไม่มีสินค้าในตะกร้า</h3>
                    <p className="mt-2 text-sm text-slate-500">เริ่มจากสแกนบาร์โค้ด หรือกรอกรหัสสินค้าในช่องด้านบน</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {Cart.map((item, index) => (
                    <ItemList
                      item={item}
                      index={index}
                      key={item.ProductCode || index}
                      onSelect={handleSelect}
                      onQuantityChange={updateQuantity}
                      formatCurrency={formatCurrency}
                    />
                  ))}
                </div>
              )}
            </section>
          </section>

          <aside className="flex flex-col gap-4">
            <section className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">Summary</p>
                  <h2 className="mt-1 text-2xl font-black">สรุปยอด</h2>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-100 text-2xl text-blue-700">
                  <FiPackage aria-hidden="true" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span className="font-semibold text-slate-500">รายการ</span>
                  <span className="text-xl font-black">{Cart.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <span className="font-semibold text-slate-500">จำนวนชิ้น</span>
                  <span className="text-xl font-black">{Item}</span>
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-amber-300 to-orange-400 p-5 text-slate-950 shadow-lg shadow-amber-200">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] opacity-70">ยอดรวม</p>
                  <p className="mt-2 text-4xl font-black">฿{formatCurrency(total)}</p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-200">
              <h2 className="text-xl font-black">ชำระเงิน</h2>
              <p className="mt-1 text-sm text-slate-500">เลือกวิธีรับชำระเมื่อพร้อมปิดการขาย</p>
              <div className="mt-5 grid gap-3">
                <ButtonUI
                  text="เงินสด"
                  icon={<FiDollarSign aria-hidden="true" />}
                  style="w-full rounded-2xl bg-emerald-500 px-5 py-6 text-lg font-black text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-600"
                  HandlePayment="cash"
                  total={total}
                  setCart={setCart}
                  Cart={Cart}
                  formatCurrency={formatCurrency}
                />
                <ButtonUI
                  text="โอน / สแกนจ่าย"
                  icon={<FiCreditCard aria-hidden="true" />}
                  style="w-full rounded-2xl bg-blue-600 px-5 py-6 text-lg font-black text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
                  HandlePayment="payment"
                  total={total}
                  setCart={setCart}
                  Cart={Cart}
                  formatCurrency={formatCurrency}
                />
              </div>
            </section>
          </aside>
        </section>
      </section>

      <MoDalUI isOpen={isOpen} setIsOpen={setIsOpen} selectedItem={selectedItem} DeleteOption={DeleteOption} formatCurrency={formatCurrency} />
      {Alert && <AlertUI onClose={() => setalert(false)} />}
    </main>
  );
}
