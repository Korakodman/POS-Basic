'use client'
import React, { useState } from 'react'
import { TableUser } from '../component/User/TableUser'

export default function page() {

const [isOpen, setIsOpen] = useState(false);
const [user,setuser] = useState([])
const [Edit,setEdit] = useState([])

const HandleEdit = (user)=>{
  setIsOpen(true)
  setEdit(user)
}

const handleInput = (e)=>{
  let {name,value} = e.target
  setEdit((prev)=>({
    ...prev,
      [name]:value
  }))
}
const Table = {HandleEdit,handleInput,setuser,user,isOpen,setIsOpen,Edit}
  return (
    <main className=" min-h-screen w-screen  bg-gray-200 font-sans">
    <header className='flex justify-center p-2'>
          <h1>User Management</h1>
          </header>
      <section>  <TableUser TableOption={Table} /></section>
      <section></section>
    </main>
  )
}
