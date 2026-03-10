"use client";

import { useEffect, useState } from "react";
import { Button, Modal } from "@heroui/react";
export default function ButtonUI({text,style,HandlePayment,total,setPOS,POS},) {


  const [paymentMethod, setPaymentMethod] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [ReceiveMoney,setReceiveMoney] = useState(0)
  const [Change,setChange] = useState(0)
    

 


function handlePay(HandlePayment) {
  if (HandlePayment == "cash") {
      if(POS.length === 0){
        alert("ไม่พบสินค้าที่ต้องการชำระ")
      }else{
        setPaymentMethod(true)
       setIsOpen(true)
      }
  } else {
      if(POS.length === 0){
        alert("ไม่พบสินค้าที่ต้องการชำระ")
      }else{
        setPaymentMethod(false)
       setIsOpen(true)
      }
  }
}

function handleAccept(params) {
 if(Change <= 0){
  alert("กรุณารับเงินเพื่อชำระสินค้า")
  setIsOpen(true)
 return
 }else{
  setPOS([])
  alert("เสร็จสิน")
  setChange(0)
  setReceiveMoney(0)
 }
}
 
const handleCaculate = (e) => {
  setReceiveMoney(e.target.value)
}
function HandleInput(e) {
  if (e.key === "Enter") {
      const result = Number(ReceiveMoney) - total;
       if(ReceiveMoney >= 1000){
        alert("รับแบงค์พัน")
         e.preventDefault();
       }
    if (result >= 0) {
      if(result === 0){
       alert("รับมาพอดี")
      }else{
      setChange(result);
      e.preventDefault();
      }
    } else {
      alert("จำนวนเงินที่รับมาไม่พอ");
      setReceiveMoney(0)
      setChange(0)
       e.preventDefault();
      return;
    }
  } 
}
function Caculate(params) {
    const result = Number(ReceiveMoney) - total;
    if (result >= 0) {
      setChange(result);
    } else {
      alert("จำนวนเงินที่รับมาไม่พอ");
      setChange(0)
      return;
    }
  } 

function Cancel(params) {
    setChange(0)
  setReceiveMoney(0)
}

 useEffect(()=>{
  
  setChange(0)
  setReceiveMoney(0)

  },[isOpen])
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
            <Modal.Dialog className="sm:max-w-[400px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>{paymentMethod ? <div className="text-xl">ชำระแบบเงินสด</div> : "ชำระด้วยสแกน"}</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                {paymentMethod ? <form className="grid p-2 text-xl">
                 <label htmlFor="text" className="mb-2">ยอดรวม : {total | 0 } บาท</label>
                 <div className=" flex">
                   <label htmlFor="text" className="mb-2">รับเงิน</label>
                 <input onKeyDown={HandleInput}  autoFocus placeholder="จำนวนเงินที่รับ" className=" font-bold ml-2 mb-2 focus:outline-0" onChange={(e)=>handleCaculate(e)} value={ReceiveMoney}></input>
                 </div>
                 <label htmlFor="text">เงินทอน : {Change}</label>
                 <Button
                  className="w-full mt-4"
                  variant="secondary"
                  onClick={Caculate}
                >
                 คำนวน
                </Button>
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
                  onClick={Cancel}
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