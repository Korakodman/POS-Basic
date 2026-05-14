"use client"

import CardShow from "./component/CardShow";
import TableUI from "./component/Table";
import useFetchData from "./hooks/useFetchData";

export default function Home() {

    let { data } = useFetchData("http://localhost:3000/api/orders");
    const item = data?.order || []
    const Length = item.length
    const total = item.reduce((sum, order) => sum + order.total, 0)
  return (
    <main className="min-h-screen w-screen  bg-gray-300 font-sans ">
      <header className="flex justify-between p-2 border-4 border-b-white h-20 items-center">
  
        </header>
       <section>
         <header className=" flex  px-4 justify-around  mt-10 border-b-4 border-white h-[125px] ">
        <CardShow Title={"ขายได้"} Text={total ? total+" บาท" : "Loading..." || total ? total +" บาท": "Loading..."  } style={""}/>
        <CardShow Title={"ออเดอร์วันนี้"} Text={Length ? Length : "Loading..." || Length ? Length : "Loading..."} style={""}/>
        <CardShow Title={"สินค้าขายดี"} Text={" 5 items"} style={""}/>
        <CardShow Title={"ลูกค้าใหม่"} Text={"11"} style={""}/>
       </header>
       </section>
       <section className="border-b-4   border-white grid ">
        <header className=" p-4 text-3xl font-bold">
          Recent Orders
       </header>
       <TableUI item={item}/>
      </section>
       <section className="grid border-b-4 border-white h-[250px]">
        <header className="text-3xl p-4 flex font-bold mt-2"><div className=" text-red-500">Alert</div> / <div className="text-orange-500">Notice</div></header>
   <div className="flex ">
     <CardShow Title={"สินค้าใกล้หมด"} Text={"4"} style={""}/>
    <CardShow Title={"Order ถูกยกเลิก"} Text={"1"} style={""}/>
    <CardShow Title={"ลูกค้าแนะนำร้านวันนี้"} Text={2 +" คน"} style={""}/>
    <CardShow Title={"ร้องเรียน"} Text={1 +" คน"} style={""}/>
   </div>
       </section>

    </main>
  );
}
