import {Avatar} from "@heroui/react";
import {Person} from "@gravity-ui/icons";
import CardShow from "./component/CardShow";
import Table from "./component/Table";
export default function Home() {
  return (
    <main className="min-h-screen w-screen  bg-gray-300 font-sans ">
      <header className="flex justify-between p-2 border-4 border-b-white h-20 items-center">
      <div></div>
      <div className="flex ">
           <Avatar>
        <Avatar.Fallback>
          <Person />
        </Avatar.Fallback>
      </Avatar>
        <h1 className="text-center p-2">Username: Korakod</h1>
        </div>
        </header>
       <section>
         <header className=" flex  px-4 justify-around  mt-10 border-b-4 border-white h-[125px] ">
        <CardShow Title={"Today's Sales"} Text={"฿ 4,520"} style={""}/>
        <CardShow Title={"Orders Today"} Text={" 38  "} style={""}/>
        <CardShow Title={" Low Stock"} Text={" 5 items"} style={""}/>
        <CardShow Title={"New Account To day"} Text={"11"} style={""}/>
       </header>
       </section>
       <section className="border-b-4 mt-2  border-white grid">
        <header className=" p-4 text-3xl font-bold">
          Recent Orders
       </header><Table/>
      </section>
       <section className="grid border-b-4 border-white h-[250px]">
        <header className="text-3xl p-4 font-bold mt-2">Alert / Notice</header>
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
