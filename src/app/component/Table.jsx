import React from "react";

export default function Table({item}) {

  
  return (
    <div className="relative overflow-hidden shadow-md rounded-lg mx-4 mb-4">
      <table className="table-fixed w-full text-left">
        <thead
          className="uppercase bg-[#6b7280] text-[#e5e7eb]"
        
        >
          <tr>
            <td className="py-3  text-center  p-4">รหัสใบเสร็จ</td>
            <td className="py-3  text-center  p-4">จำนวนเงิน</td>
            <td className="py-3  text-center  p-4">สถานะ</td>
            <td className="py-3  text-center  p-4">วันที่</td>
            <td className="py-3  text-center  p-4">รายระเอียด</td>
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
            <td className="py-3  text-center  p-4">{new Date(i.createdAt).toLocaleDateString('th-TH')}</td>
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
