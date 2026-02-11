"use client"
import React, { useRef } from "react";
import ButtonUI  from "../component/Button";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import  ItemList  from "../component/Item";
import {Button, Modal} from "@heroui/react";
import {Rocket} from "@gravity-ui/icons";

export default function page() {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


   function handleSelect(item) {
    setSelectedItem(item);
    setIsOpen(true);
  }

  let database = [{
    productId: "2468",
    name: "Pencil",
    price: 10,

  },{
    productId: "5648",
    name: "เลย์",
    price: 22,
  },]

  const [Mockitem,setMockitem] = useState([])
  

  function calculateTotal(Mockitem) {
    let result = 0
    for (let i = 0; i < Mockitem.length; i++) {
    const element = Mockitem[i];
     result += (element.price * element.quality)
  }
  return result
  }
  function calculateItem(Mockitem) {
    let result = 0
    for (let i = 0; i < Mockitem.length; i++) {
      const element = Mockitem[i];
      console.log(result += element.quality)
    }
    return result
  }

  const Barcode = useRef()
 
  

 function handleEnter(e) {
  if(e.key === "Enter"){
    // บาร์โค้ด
     const barcode = Barcode.current.value
     // ถ้าเจอสินค้า 
    let found = database.find((prev => prev.productId === barcode))

  if (found) {
  setMockitem((prev) => {
    const exist = prev.find(item => item.productId === found.productId)

    if (exist) {
      // ถ้ามีอยู่แล้ว → เพิ่มจำนวน
      return prev.map(item =>
        item.productId === found.productId
          ? { ...item, quality: item.quality + 1 }
          : item
      )
    } else {
      // ถ้ายังไม่มี → เพิ่มเข้าไปใหม่
      
      return [...prev, { ...found, quality: 1 }]
      
    }
  })
}else{
  alert("ไม่พบสินค้า")
}
 
  Barcode.current.value = ""
  }
  }
let Item =(calculateItem(Mockitem))
let total = (calculateTotal(Mockitem))

function DeleteOption(id) {
  console.log("ลบรายการ",id)
    setMockitem((prev)=>prev.filter((item)=>item.productId !== id))
}
  return (
    <main className=" min-h-screen w-screen  bg-gray-200 font-sans">
      {/* <------- Header -------> */}
      <header className=" bg-gray-300 opacity-80  p-4 flex h-30 justify-between items-center">
        <div>
          <img src="/Barcode.png" className=" w-[200px] h-[100px]"></img>
        </div>
        <div className="p-4 ">
          <input
            className="p-4 w-[1250px] border-2 border-gray-400 rounded-3xl"
            type="text"
            placeholder="Scan The Barcode"
            ref={Barcode}
           onKeyDown={handleEnter}
          ></input>
        </div>
        <div className="">
          <button onClick={console.log("test")} className="hover:opacity-50 flex  items-center "><MdOutlineDelete className="text-4xl" />
          </button>
          </div>
      </header>
      {/* <------- Header -------> */}
      {/* <------- Section ------> */}
      <section className="grid border-t-4 border-white ">
        {/* <----- Header list ----- > */}
        <section className=" h-[500px]">
          <div>
            <header className="p-4 bg-gray-300 flex justify-between font-bold">
              <h1 className="p-2 ">สินค้า</h1>
              <div className="flex p-2 w-60  justify-between ">
                <h1>ราคา</h1>
                <h1>จำนวน</h1>
              </div>
            </header>
            {/* Item Cart */}
            <section className=" bg-gray-100 p-2 h-[400]" >
              {Mockitem.map((item,index)=>{
               return <ItemList item={item}  index={index} key={index}   onSelect={handleSelect}/>
              })
              }
      
            </section>
             {/* Item Cart */}
          </div>
          <section className=" flex justify-between font-bold bg-amber-200 h-20 items-center">
            <div>
              <h1 className="p-2 "> รวม</h1>
            </div>
            <div className="flex p-2 justify-between w-60">
              <h1>|{total} บาท |</h1>
              <h1>{Mockitem.length} รายการ |</h1>
              <h1>{Item} ชิ้น |</h1>
            </div>
          </section>
        </section>
        {/* <----- Header list ----- > */}
        <section className="flex p-2 h-[300] items-center mx-56 justify-center ">
          <section>
            <ButtonUI
              text={"Cash"}
              style={"bg-yellow-500 px-20 py-6 text-xl mr-20"}
              
            />
          </section>
          <section>
            <ButtonUI
              text={"Payment"}
              style={"bg-blue-500 px-20 py-6 text-xl"}
            />
          </section>
        </section>
        
      </section>
      {/* <------- Section ------> */}
       <Modal  isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>ลบรายการหรือไม่?</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <h1>
               {selectedItem?.name}
              </h1>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close" variant='danger' onClick={()=>DeleteOption(selectedItem?.productId)}>
                ลบ
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>

    </main>
    
  );
  
}
