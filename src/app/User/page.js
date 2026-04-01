import React from 'react'
import { TableUser } from '../component/TableUser'

export default function page() {
  return (
    <main className=" min-h-screen w-screen  bg-gray-200 font-sans">
    <header className='flex justify-center p-2'>
          <h1>User Management</h1>
          </header>
      <section>  <TableUser /></section>
      <section></section>
    </main>
  )
}
