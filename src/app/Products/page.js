import React from 'react'
import { ComboBoxUI } from '../component/ComboBox'
import {Input, Label} from "@heroui/react";
import ProductsUI from '../component/ProductsUI';
export default function page() {
  return (  
    <main className=' min-h-screen w-screen  bg-gray-300 font-sans'>
      <header className='h-20 p-2 flex border-4  items-center border-b-white'>
        <h1 className=' text-xl mr-4 ml-4'>Search</h1>
        <div className='flex justify-center items-center'>
            <Input className="w-36 h-9 mr-4" id="name" placeholder="Search Products" type="text" />
           <ComboBoxUI/>
        </div>
        </header>
      <section className='grid border-4 border-b-white'>
        <header className='flex justify-center '>
          <h1 className='text-2xl mt-2  '>Products List</h1>
        </header>
        <div className='p-4 grid grid-cols-3 place-items-center '>
        <ProductsUI/>
         <ProductsUI/>
        <ProductsUI/>
        <ProductsUI/>
        <ProductsUI/> 
        <ProductsUI/>
          <ProductsUI/>
        <ProductsUI/> 
        <ProductsUI/>

        </div>
        </section>
    </main>
  )
}
