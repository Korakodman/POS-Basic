"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
function NavbarUI() {
    let route = useRouter()
    function Home(num) {
   route.push("/")
    }
      function Tables(num) {
   route.push("/Tables")
    }
      function Order(num) {
   route.push("/Order")
    }
      function Products(num) {
   route.push("/Products")
    }
      function Settings(num) {
   route.push("/Settings")
    }
  return (
         <nav className=' bg-gray-300 p-4 grid w-[250px] justify-center text-center border-r-4 border-white'>
          
            <header className='mt-20 hover:cursor-pointer' onClick={Home} >  <h1 className='text-2xl'>POS</h1></header>
 
             <section>
<ul className='mt-20'>
    <li onClick={Home} >Home</li>
    <li onClick={Tables}>Tables</li>
    <li onClick={Order}>Order</li>
    <li onClick={Products}>Products</li>
    <li onClick={Settings}>Settings</li>
</ul>
            </section>
            <section className=' mt-40'>
                <h1 className='font-bold bg-red-500 px-2 py-2 hover:cursor-pointer hover:bg-red-400 text-white'>Logout</h1>
                </section>

         </nav>
  )
}

export default NavbarUI