"use client"
import { useEffect, useState } from 'react'
import useFetchData from '../hooks/useFetchData'

export default function page() {

const [Orders,setOrders] = useState([])

let {data,loading,error} = useFetchData("http://localhost:3000/api/orders")

 useEffect(()=>{
setOrders(data)
},[data])

 function ShowDetail(item) {
 console.log(item)
 }

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
      {Orders?.order?.map(order => (
        <tr className=' bg-gray-400' key={order._id}>
          <td className="p-2 border  border-white ">{order._id}</td>
          <td className="p-2 border border-white ">{order.createdAt}</td>
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
