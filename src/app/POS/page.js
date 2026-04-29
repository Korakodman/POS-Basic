"use client"
import React, { useRef } from "react";
import ButtonUI  from "../component/Button";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import  ItemList  from "../component/Item";
import {Button, Modal} from "@heroui/react";
import {Rocket} from "@gravity-ui/icons";
import { MoDalUI } from "../component/Modal";
import AlertUI from "../component/Alert";
import useFetchData from "../hooks/useFetchData";
export default function page() {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [Alert,setalert] = useState(false)




   function handleSelect(item) {
    setSelectedItem(item);
    setIsOpen(true);
  }

const { data, loading, error } = useFetchData("http://localhost:3000/api/products")

  const [Cart,setCart] = useState([])
   
 
  function calculateTotal(Cart) {
    let result = 0
    for (let i = 0; i < Cart.length; i++) {
    const element = Cart[i];
     result += (element.price * element.qty)
  }
  return result
  }
  function calculateItem(Cart) {
    let result = 0
    for (let i = 0; i < Cart.length; i++) {
      const element = Cart[i];
    }
    return result
  }

  const Barcode = useRef()
 
  

 function handleEnter(e) {
  if(e.key === "Enter"){
    // บาร์โค้ด
     const barcode = Barcode.current.value
     // ถ้าเจอสินค้า 
    let found = data.find((prev => prev.ProductCode === barcode))

  if (found) {
  setCart((prev) => {
    const exist = prev.find(item => item.ProductCode === found.ProductCode)
     
    if (exist) {
      console.log(prev)
      return prev.map(item =>
        item.ProductCode === found.ProductCode
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    } else {
      
      return [...prev, { ...found, qty: 1 }]
      
    }
  })
}else{
  setalert(true)
  setTimeout(() => {
    setalert(false)
  }, 2000);
    Barcode.current.value = ""
    Barcode.current.focus()
  return  
}
Barcode.current.value = ""
  Barcode.current.focus()
  }
  }
let Item =(calculateItem(Cart))
let total = (calculateTotal(Cart))

function DeleteOption(ProductCode) {
    setCart((prev)=>prev.filter((item)=>item.ProductCode !== ProductCode))
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
            <section className=" bg-gray-100 p-2 h-[400] overflow-y-auto "  >
         {Cart.map((item,index)=>{
               return <ItemList item={item}  index={index} key={index}   onSelect={handleSelect}/>
              })}

            </section>
             {/* Item Cart */}
          </div>
          <section className=" flex justify-between font-bold bg-amber-200 h-20 items-center">
            <div>
              <h1 className="p-2 "> รวม</h1>
            </div>
            <div className="flex p-2 justify-between w-60">
              <h1>|{total} บาท |</h1>
              <h1>{Cart.length} รายการ |</h1>
              <h1>{Item} ชิ้น |</h1>
            </div>
          </section>
        </section>
        {/* <----- Header list ----- > */}
        <section className="flex p-2 h-[280] items-center mx-56 justify-center ">
          <section>
            <ButtonUI
              text={"Cash"}
              style={"bg-yellow-500 px-20 py-6 text-xl mr-20"}
             HandlePayment={"cash"}
             total={total}
            setCart={setCart}
            Cart={Cart}
            />
          </section>
          <section>
            <ButtonUI
              text={"Payment"}
              style={"bg-blue-500 px-20 py-6 text-xl"}
          HandlePayment={"payment"}
          setCart={setCart}
          Cart={Cart}
            />
          </section>
        </section>
        
      </section>
      {/* <------- Section ------> */}
      <MoDalUI isOpen={isOpen} setIsOpen={setIsOpen}  selectedItem={selectedItem} DeleteOption={DeleteOption}/>
      {Alert && (
        <AlertUI
          onClose={() => setalert(false)}
        />
      )}
    </main>
    
  );
  
}
