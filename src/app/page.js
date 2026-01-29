
import CardShow from "./component/CardShow";
import Table from "./component/Table";
export default function Home() {
  return (
    <main className="min-h-screen w-screen  bg-gray-300 font-sans ">

       <header className=" flex  p-4 justify-around  border-b-4 border-white h-[125px] ">
        <CardShow Title={"Today's Sales"} Sale={"฿ 4,520"} style={""}/>
        <CardShow Title={"Orders Today"} Sale={" 38  "} style={""}/>
        <CardShow Title={" Low Stock"} Sale={" 5 items"} style={""}/>
        <CardShow Title={"New Account To day"} Sale={"11"} style={""}/>
       </header>
       <section className="border-b-4 mt-4  border-white"><Table/></section>
       

    </main>
  );
}
