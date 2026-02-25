"use client"
import React,{useState} from "react";
import {Button, Modal} from "@heroui/react";
export default function ProductsUI({name,price,stock,category,image}) {
 const [isOpen, setIsOpen] = useState(false);

     function handleModal() {
    setIsOpen(true);
  }
  const openModal = ({name}) =>{
  handleModal()
  }

  return (
    <div onClick={()=>openModal({name})} className="flex border-2  w-[400] h-[200] justify-around items-center bg-white p-2 rounded-xl mt-10 drop-shadow-gray-500 drop-shadow-2xl" >
      <section className="w-[175] " >
        <img src={image}></img>
      </section>
      <section className=" p-2">
        <div className="font-bold">ชื่อสินค้า : {name}</div>
        <div className="mt-4">ราคา : {price}</div>
        <div className="mt-4">จำนวนในคลัง : {stock}</div>
         <div className="mt-4">ประเภท : {category}</div>
      </section>
       <Modal  isOpen={isOpen} onOpenChange={setIsOpen}>
              <Modal.Backdrop>
                <Modal.Container>
                  <Modal.Dialog className="sm:max-w-[360px]">
                    <Modal.CloseTrigger />
                    <Modal.Header>
                      <Modal.Heading>แก้ไขรายการหรือไม่?</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body>
                      <h1>
                       แก้ไข
                      </h1>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="w-full" slot="close" variant='primary' >
                        ลบ
                      </Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
    </div>
    
  );
}
