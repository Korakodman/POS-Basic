"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { AvatarUI } from '../Layout/AvatarUI'
function NavbarUI({user}) {
    let route = useRouter()
    function Home() {
   route.push("/")
    }

      function Order() {
   route.push("/Order")
    }
      function Products() {
   route.push("/Products")
    }
      function Settings() {
   route.push("/Settings")
    }
    function POS() {
   route.push("/POS")
    }
    function Users() {
   route.push("/User")
    }

  
async function LogoutHandle(params) {
  axios.get("http://localhost:3000/api/Logout")
  .then(function(respone){
    setTimeout(() => {
      route.refresh()
    }, 1000);
  })
  .catch(function(error){
    console.log(error)
  })
}
  return (
         <nav className=' bg-gray-300 p-4 grid w-[250px] justify-center text-center border-r-4 border-white'>
          
            <header className='mt-20 hover:cursor-pointer' onClick={POS} >  <h1 className='text-2xl'>POS</h1></header>
 
             <section>
<ul className='mt-20'>
    <li className='li-nav' onClick={Home} >Home</li>
    <li className='li-nav'onClick={Order}>Order</li>
    <li className='li-nav' onClick={Products}>Products</li>
     {user.role == "Admin" ?  <li className='li-nav' onClick={Users}>Users</li> : ""}
    <li className='li-nav'onClick={Settings}>Settings</li>
</ul>
            </section>
            <section className=' mt-36'>
                <AvatarUI user={user}/>
                <h1 className='font-bold bg-red-500 px-2 py-2 hover:cursor-pointer  hover:bg-red-400 text-white'onClick={LogoutHandle}>Logout</h1>
                </section>

         </nav>
  )
}

export default NavbarUI