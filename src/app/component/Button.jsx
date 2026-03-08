"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";
export default function ButtonUI({text,style,HandlePayment,total,setPOS},) {


  const [paymentMethod, setPaymentMethod] = useState(null)
  const [isOpen, setIsOpen] = useState(false);

  


function handlePay(HandlePayment) {
  if (HandlePayment == "cash") {
    setPaymentMethod(true)
    setIsOpen(true)
  } else {
     setPaymentMethod(false)
       setIsOpen(true)
  }
}

function handleAccept(params) {
  setPOS([])
  alert("เสร็จสิน")
}
 
  return <>
  <Button className={style} onClick={()=>handlePay(HandlePayment)} >{text}</Button>
  <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>{paymentMethod ? "ชำระแบบเงินสด" : "ชำระด้วยสแกน"}</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                {paymentMethod ? <form className="grid">
                 <label htmlFor="text">ยอดรวม : {total | 0 } บาท</label>
                 <label htmlFor="text">รับเงิน</label>
                 <input placeholder="จำนวนเงินที่รับ"></input>
                 <label htmlFor="text">เงินทอน</label>
                </form> : "รูป QR" }
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="w-full"
                  slot="close"
                  variant="primary"
                  onClick={handleAccept}
                >
                 เสร็จสิน
                </Button>
                <Button
                  className="w-full"
                  slot="close"
                  variant="danger"
                >
                  ยกเลิก
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
  </>;
}