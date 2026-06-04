"use client";

import { useEffect, useState } from "react";
import { Button, Modal } from "@heroui/react";
import axios from "axios";

export default function ButtonUI({ text, icon, style, HandlePayment, total = 0, setCart, Cart, formatCurrency }) {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ReceiveMoney, setReceiveMoney] = useState("");
  const [Change, setChange] = useState(0);
  const [User, SetUser] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCashPayment = paymentMethod === "cash";
  const displayCurrency = formatCurrency || ((value) => Number(value || 0).toLocaleString("th-TH"));

  function resetPaymentState() {
    setChange(0);
    setReceiveMoney("");
  }

  useEffect(() => {
    axios
      .get("/api/me")
      .then((response) => {
        SetUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handlePay(option) {
    if (Cart.length === 0) {
      alert("ไม่พบสินค้าที่ต้องการชำระ");
      return;
    }

    resetPaymentState();
    setPaymentMethod(option);
    setIsOpen(true);
  }

  async function handleAccept() {
    if (isCashPayment && Number(ReceiveMoney) < total) {
      alert("กรุณารับเงินให้เพียงพอกับยอดชำระ");
      return;
    }

    if (!User?.id) {
      alert("ไม่พบข้อมูลผู้ใช้งาน กรุณาเข้าสู่ระบบใหม่");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: User.id, items: Cart, OptionPayment: isCashPayment ? "cash" : "payment" }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      setCart([]);
      resetPaymentState();
      setIsOpen(false);
      alert("ชำระเงินสำเร็จ");
    } catch (error) {
      alert(error.message || "บันทึกคำสั่งซื้อไม่สำเร็จ");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCalculate() {
    const result = Number(ReceiveMoney) - total;

    if (result >= 0) {
      setChange(result);
      return;
    }

    alert("จำนวนเงินที่รับมาไม่พอ");
    setChange(0);
  }

  function HandleInput(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCalculate();
    }
  }

  function Cancel() {
    resetPaymentState();
    setIsOpen(false);
  }

  return (
    <>
      <Button className={style} onClick={() => handlePay(HandlePayment)}>
        <span className="inline-flex items-center justify-center gap-2">
          {icon}
          {text}
        </span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[460px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">Payment</p>
                    <h2 className="mt-1 text-2xl font-black text-slate-900">
                      {isCashPayment ? "ชำระแบบเงินสด" : "ชำระด้วยโอน / สแกนจ่าย"}
                    </h2>
                  </div>
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <div className="space-y-4 text-slate-900">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm font-bold text-slate-500">ยอดที่ต้องชำระ</p>
                    <p className="mt-2 text-4xl font-black text-blue-700">฿{displayCurrency(total)}</p>
                  </div>

                  {isCashPayment ? (
                    <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
                      <label className="grid gap-2 text-sm font-bold text-slate-600" htmlFor="receive-money">
                        รับเงิน
                        <input
                          id="receive-money"
                          onKeyDown={HandleInput}
                          autoFocus
                          inputMode="decimal"
                          min="0"
                          placeholder="จำนวนเงินที่รับ"
                          className="rounded-2xl border border-slate-200 px-4 py-3 text-xl font-black text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                          onChange={(e) => setReceiveMoney(e.target.value)}
                          value={ReceiveMoney}
                        />
                      </label>
                      <div className="flex items-center justify-between rounded-2xl bg-emerald-50 p-4 text-emerald-800">
                        <span className="font-bold">เงินทอน</span>
                        <span className="text-2xl font-black">฿{displayCurrency(Change)}</span>
                      </div>
                      <Button className="w-full rounded-2xl bg-slate-900 py-5 font-bold text-white" onClick={handleCalculate}>
                        คำนวณเงินทอน หรือกด Enter
                      </Button>
                    </form>
                  ) : (
                    <div className="rounded-3xl border-2 border-dashed border-blue-200 bg-blue-50 p-6 text-center">
                      <div className="mx-auto grid h-44 w-44 place-items-center rounded-3xl bg-white text-sm font-bold text-slate-400 shadow-inner">
                        QR Code
                      </div>
                      <p className="mt-4 font-bold text-blue-900">ให้ลูกค้าสแกนจ่ายตามยอด แล้วกดยืนยันเมื่อได้รับเงิน</p>
                    </div>
                  )}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="w-full rounded-2xl bg-blue-600 py-5 font-black text-white disabled:opacity-60"
                  onClick={handleAccept}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "กำลังบันทึก..." : "ยืนยันชำระเงิน"}
                </Button>
                <Button className="w-full rounded-2xl bg-red-50 py-5 font-black text-red-600" onClick={Cancel}>
                  ยกเลิก
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
