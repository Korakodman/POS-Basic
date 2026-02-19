"use client"
import { useState } from 'react'
const mockOrders = [
  {
    id: "ORD-0001",
    date: "2026-02-19T14:32:00",
    paymentMethod: "Cash",
    items: [
      {
        productId: "P001",
        name: "ดินสอ",
        price: 10,
        quality: 2,
      },
      {
        productId: "P002",
        name: "สมุด",
        price: 35,
        quality: 1,
      },
    ],
    subtotal: 55,
    vat: 3.85,
    total: 58.85,
    paid: 100,
    change: 41.15,
  },
  {
    id: "ORD-0002",
    date: "2026-02-19T16:10:00",
    paymentMethod: "QR",
    items: [
      {
        productId: "P003",
        name: "ปากกา",
        price: 15,
        quality: 3,
      },
    ],
    subtotal: 45,
    vat: 3.15,
    total: 48.15,
    paid: 48.15,
    change: 0,
  },
  {
    id: "ORD-0003",
    date: "2026-02-18T11:05:00",
    paymentMethod: "Card",
    items: [
      {
        productId: "P004",
        name: "แฟ้มเอกสาร",
        price: 50,
        quality: 1,
      },
      {
        productId: "P005",
        name: "ไฮไลท์",
        price: 20,
        quality: 2,
      },
    ],
    subtotal: 90,
    vat: 6.3,
    total: 96.3,
    paid: 100,
    change: 3.7,
  },
]


export default function page() {

 function ShowDetail(item) {
  console.log(item)
 }

  const [orders, setOrders] = useState(mockOrders)
  return (
    <div className=' min-h-screen w-screen  bg-gray-500 font-sans'>
      <div className="p-6">

  <h1 className="text-2xl font-bold mb-4">
    Order History
  </h1>

  <table className="w-full border">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 border">Receipt</th>
        <th className="p-2 border">Date</th>
        <th className="p-2 border">Total</th>
        <th className="p-2 border">View</th>
      </tr>
    </thead>
    <tbody className=''>
      {orders.map(order => (
        <tr className=' bg-gray-400' key={order.id}>
          <td className="p-2 border  border-white ">{order.id}</td>
          <td className="p-2 border border-white ">{order.date}</td>
          <td className="p-2 border border-white">{order.total}</td>
          <td className="p-2 border border-white text-center w-50">
            <button className="text-blue-500 bg-white py-2 px-4 rounded-xl" onClick={()=>ShowDetail(order)}>
              ดูรายละเอียด
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

</div>

    </div>
  )
}
