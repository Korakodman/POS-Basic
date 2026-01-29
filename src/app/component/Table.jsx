import React from "react";

export default function Table() {
  return (
    <div className="relative overflow-hidden shadow-md rounded-lg mx-4 mb-4">
      <table className="table-fixed w-full text-left">
        <thead
          className="uppercase bg-[#6b7280] text-[#e5e7eb]"
        
        >
          <tr>
            <td className="py-3  text-center  p-4">Order ID</td>
            <td className="py-3  text-center  p-4">Cashier   </td>
            <td className="py-3  text-center  p-4">Total   </td>
            <td className="py-3  text-center  p-4">Status</td>
            <td className="py-3  text-center  p-4">Detail</td>
          </tr>
        </thead>
        <tbody
          className="bg-white text-gray-500 bg-[#FFFFFF] text-[#6b7280]"
        >
          <tr className=" py-4" >
            <td className=" py-4  text-center  p-4">853581</td>
            <td className=" py-4  text-center  p-4">A</td>
            <td className=" py-4  text-center  p-4">$ 299</td>
            <td className=" py-4  text-center  p-4">Paid</td>
            <td className=" py-4  text-center  p-4">Click More Detail</td>
          </tr>
          <tr className=" py-4" >
            <td className=" py-4  text-center  p-4">851215</td>
            <td className=" py-4  text-center  p-4">B</td>
            <td className=" py-4  text-center  p-4">$ 299</td>
            <td className=" py-4  text-center  p-4">Paid</td>
            <td className=" py-4  text-center  p-4">Click More Detail</td>
          </tr>
          <tr className=" py-4">
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
          </tr>
          <tr className=" py-4">
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
          </tr>
          <tr className=" py-4">
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
          </tr>
          <tr className=" py-4" >
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
          </tr>
          <tr className=" py-4">
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
            <td className=" py-4  text-center  p-4"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
