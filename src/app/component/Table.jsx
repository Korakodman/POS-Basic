import React from "react";

export default function Table({item}) {
  return (
    <div className="relative overflow-hidden shadow-md rounded-lg mx-4 mb-4">
      <table className="table-fixed w-full text-left">
        <thead
          className="uppercase bg-[#6b7280] text-[#e5e7eb]"
        
        >
          <tr>
            <td className="py-3  text-center  p-4">Order ID</td>
            <td className="py-3  text-center  p-4">Total   </td>
            <td className="py-3  text-center  p-4">Status</td>
            <td className="py-3  text-center  p-4">Detail</td>
          </tr>
        </thead>
        <tbody
          className="bg-white text-gray-500 bg-[#FFFFFF] text-[#6b7280]"
        >
         {item ? item.map((i)=>(
            <tr key={i._id} className="py-4">
              <td className=" py-4  text-center  p-4">{i._id}</td>
            <td className=" py-4  text-center  p-4">{i.total + " บาท" }</td>
            <td className=" py-4  text-center  p-4">{i.status}</td>
            <td className=" py-4  text-center  p-4">Click More Detail</td>
            </tr>
           ))
         :  <tr className="py-4">
           <td className=" py-4  text-center  p-4">Loading</td>
            <td className=" py-4  text-center  p-4">Loading</td>
            <td className=" py-4  text-center  p-4">Loading</td>
            <td className=" py-4  text-center  p-4">Loading</td>
            </tr>
            }
        </tbody>
      </table>
    </div>
  );
}
