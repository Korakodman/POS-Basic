"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
function NavbarUI() {
    let route = useRouter()
    function Home(params) {
    route.push("/login")
    }
  return (
         <nav className=' bg-gray-300 p-4 grid w-[250px] justify-center text-center'>
          
            <header className='mt-20'>  <h1 className='text-2xl'>POS</h1></header>
 
             <section>
<ul className='mt-20'>
    <li onClick={Home} >Home</li>
    <li>Tables</li>
    <li>Order</li>
    <li>Products</li>
    <li>Settings</li>
</ul>
            </section>
            <section className=' mt-40'>
                <h1>Logout</h1>
                </section>

         </nav>
  )
}

export default NavbarUI