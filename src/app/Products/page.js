import React from 'react'
import { ComboBoxUI } from '../component/ComboBox'
import {Input, Label} from "@heroui/react";
import ProductsUI from '../component/ProductsUI';
export default function page() {


 let itemMock = [{
  image:"https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/01/88/8850718807901/8850718807901_1-20240531120654-.jpg",
    name:"เลย์แผ่นเรียบ",
    price:22,
    quantity:20,
    catalog:"ขนมทานเล่น"
    
   },
  {
    image :"https://o2o-static.lotuss.com/products/86593/72548045.jpg",
    name:"เลย์บาร์บีคิว",
    price:22,
    quantity:10,
    catalog:"ขนมทานเล่น"
    
   },
  {
    image:"https://gg.lnwfile.com/g2y3jl.webp",
    name:"เลย์รสหมึกย่าง",
    price:22,
    quantity:11,
    catalog:"ขนมทานเล่น"
    
   },
  {
     image:"https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/55/88/8850718711055/8850718711055_2-20240610175920-.jpg",
    name:"เลย์รสไข่เค็ม",
    price:22,
    quantity:20,
    catalog:"ขนมทานเล่น"
    
   }]

  return (  
    <main className=' min-h-screen w-screen  bg-gray-300 font-sans'>
      <header className='h-20 p-2 flex border-4  items-center border-b-white'>
        <h1 className=' text-xl mr-4 ml-4'>ค้นหา</h1>
        <div className='flex justify-center items-center'>
            <Input className="w-[250] h-9 mr-4" id="name" placeholder="ค้นหาสินค้าในคลัง" type="text" />
           <ComboBoxUI/>
        </div>
        </header>
      <section className='border-4 border-b-white h-[800]'>
        <header className='flex justify-center '>
          <h1 className='text-2xl mt-2 '>รายการสินค้าในคลัง</h1>
        </header>
         <div className='p-4 grid grid-cols-3 place-items-center'>
       {itemMock.map((item,index)=>{
        return(
           <ProductsUI key={index} name={item.name} price={item.price} quantity={item.quantity} catalog={item.catalog} image={item.image}/>
        )
       })}

        </div>
        </section>
    </main>
  )
}
