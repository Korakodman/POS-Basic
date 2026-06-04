"use client";

import { Button, Modal } from "@heroui/react";

export function MoDalUI({ isOpen, setIsOpen, selectedItem, DeleteOption, formatCurrency }) {
  const displayCurrency = formatCurrency || ((value) => Number(value || 0).toLocaleString("th-TH"));

  function handleDelete() {
    DeleteOption(selectedItem?.ProductCode);
    setIsOpen(false);
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[420px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">Remove item</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-900">ลบรายการนี้หรือไม่?</h2>
                </div>
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="rounded-3xl bg-slate-50 p-5 text-slate-900">
                <p className="text-lg font-black">{selectedItem?.name}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-white p-3">
                    <p className="font-semibold text-slate-500">ราคา</p>
                    <p className="mt-1 font-black">฿{displayCurrency(selectedItem?.price)}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3">
                    <p className="font-semibold text-slate-500">จำนวน</p>
                    <p className="mt-1 font-black">{selectedItem?.qty || 0} ชิ้น</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-500">หากต้องการปรับจำนวน สามารถกดปุ่ม + / - ที่รายการสินค้าได้โดยไม่ต้องลบรายการ</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full rounded-2xl bg-red-600 py-5 font-black text-white" onClick={handleDelete}>
                ลบรายการ
              </Button>
              <Button className="w-full rounded-2xl bg-slate-100 py-5 font-black text-slate-700" onClick={() => setIsOpen(false)}>
                ยกเลิก
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
