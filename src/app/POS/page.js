"use client"
import React from "react";
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

  const Mockitem = [{
     name: "pencil",
    amount: 10,
    quality: 1,

  },{
     name: "เลย์",
    amount: 22,
    quality: 2,
  },]
  

  function calculateTotal(Mockitem) {
    let result = 0
    for (let i = 0; i < Mockitem.length; i++) {
    const element = Mockitem[i];
     result += (element.amount * element.quality)
  }
  return result
  }
  function calculateItem(Mockitem) {
    let result = 0
    for (let i = 0; i < Mockitem.length; i++) {
      const element = Mockitem[i];
      result += element.quality
    }
    return result
  }

  const [Barcode,SetBarcode] = useState("")
 function barcode(e) {
  let result = e.target.value
  SetBarcode(result)
 }
 function DeleteBarcode(params) {
  SetBarcode("")
 }

let Item =(calculateItem(Mockitem))
let total = (calculateTotal(Mockitem))
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
            value={Barcode}
            onChange={(e)=>barcode(e)}
          ></input>
        </div>
        <div className="">
          <button onClick={DeleteBarcode} className="hover:opacity-50 flex  items-center "><MdOutlineDelete className="text-4xl" />
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
              <Modal.Icon className="bg-default text-foreground">
                <Rocket className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Welcome to HeroUI</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                A beautiful, fast, and modern React UI library for building accessible and
                customizable web applications with ease.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" slot="close">
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>

    </main>
    
  );
  
}
