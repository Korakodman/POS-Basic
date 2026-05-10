"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { AvatarUI } from "../Layout/AvatarUI";
import { House, ShoppingCart, Package, Users, Settings } from "lucide-react";
function NavbarUI({ user }) {
  const route = useRouter();
  const pathname = usePathname();

  const menus = [
    {
      name: "Home",
      path: "/",
      icon: House,
    },
    {
      name: "Order",
      path: "/Order",
      icon: ShoppingCart,
    },
    {
      name: "Products",
      path: "/Products",
      icon: Package,
    },

    ...(user.role === "admin"
      ? [
          {
            name: "Users",
            path: "/User",
            icon: Users,
          },
        ]
      : []),

    {
      name: "Settings",
      path: "/Settings",
      icon: Settings,
    },
  ];

  async function LogoutHandle() {
    axios
      .get("http://localhost:3000/api/Logout")
      .then(function () {
        setTimeout(() => {
          route.refresh();
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <nav className="bg-gray-300 p-4 w-[250px] min-h-screen border-r-4 border-white flex flex-col justify-between">
      <section>
        <header
          className="mt-20 text-center hover:cursor-pointer"
          onClick={() => route.push("/POS")}
        >
          <h1 className="text-2xl font-bold">POS</h1>
        </header>

        <ul className="mt-20 flex flex-col gap-3">
          {menus.map((menu, index) => {
            const isActive = pathname === menu.path;
            const Icon = menu.icon;

            return (
              <li
                key={index}
                onClick={() => route.push(menu.path)}
                className={`
        flex items-center gap-3
        px-4 py-3 rounded-xl
        cursor-pointer transition-all duration-200
        font-medium

        ${
          isActive
            ? "bg-white text-black shadow-md"
            : "hover:bg-white/60 text-gray-700"
        }
      `}
              >
                <Icon size={20} />

                <span>{menu.name}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mb-10">
        <AvatarUI user={user} />

        <button
          className="font-bold bg-red-500 px-2 py-2 mt-4 rounded-xl hover:bg-red-400 text-white w-full"
          onClick={LogoutHandle}
        >
          Logout
        </button>
      </section>
    </nav>
  );
}

export default NavbarUI;
