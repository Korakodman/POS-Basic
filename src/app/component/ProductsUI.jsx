"use client"
import React from "react";

export default function ProductsUI({name,price,quantity,catalog,image}) {

  const openModal = ({name}) =>{
  console.log("สินค้าชื่อ",name)
  }

  return (
    <div onClick={()=>openModal({name})} className="flex border-2  w-[400] h-[200] justify-around items-center bg-white p-2 rounded-xl mt-10 drop-shadow-gray-500 drop-shadow-2xl" >
      <section className="w-[175] " >
        <img src={image}></img>
      </section>
      <section className=" p-2">
        <div className="font-bold">ชื่อสินค้า : {name}</div>
        <div className="mt-4">ราคา : {price}</div>
        <div className="mt-4">จำนวนในคลัง : {quantity}</div>
         <div className="mt-4">ประเภท : {catalog}</div>
      </section>
    </div>
  );
}
