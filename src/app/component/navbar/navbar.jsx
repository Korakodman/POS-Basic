"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { AvatarUI } from '../Layout/AvatarUI'

function NavbarUI({ user }) {
  let route = useRouter()

  const menus = [
    { name: "Home", path: "/" },
    { name: "Order", path: "/Order" },
    { name: "Products", path: "/Products" },
    ...(user.role === "admin"
      ? [{ name: "Users", path: "/User" }]
      : []),
    { name: "Settings", path: "/Settings" },
  ]

  async function LogoutHandle() {
    axios
      .get("http://localhost:3000/api/Logout")
      .then(function () {
        setTimeout(() => {
          route.refresh()
        }, 1000)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <nav className="bg-gray-300 w-[260px] min-h-screen border-r-4 border-white flex flex-col justify-between p-6">

      {/* Logo */}
      <section>
        <header
          className="mt-10 mb-14 hover:cursor-pointer"
          onClick={() => route.push("/POS")}
        >
          <h1 className="text-3xl font-bold tracking-wide text-gray-800">
            POS
          </h1>
        </header>

        {/* Menu */}
        <ul className="flex flex-col gap-3">

          {menus.map((menu, index) => (
            <li
              key={index}
              onClick={() => route.push(menu.path)}
              className="
                bg-white/70
                backdrop-blur-sm
                px-4
                py-3
                rounded-2xl
                shadow-sm
                hover:bg-white
                hover:shadow-md
                hover:scale-[1.02]
                transition-all
                duration-200
                cursor-pointer
                font-medium
                text-gray-700
              "
            >
              {menu.name}
            </li>
          ))}

        </ul>
      </section>

      {/* User */}
      <section className="flex flex-col gap-4">

        <div className="bg-white rounded-2xl p-3 shadow-sm">
          <AvatarUI user={user} />
        </div>

        <button
          onClick={LogoutHandle}
          className="
            bg-red-500
            hover:bg-red-400
            text-white
            py-3
            rounded-2xl
            font-semibold
            transition-all
            duration-200
            shadow-md
          "
        >
          Logout
        </button>

      </section>
    </nav>
  )
}

export default NavbarUI