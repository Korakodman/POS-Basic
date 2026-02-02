import React from "react";
import { ButtonUI } from "../component/Button";

export default function page() {
  return (
    <main className=" min-h-screen w-screen  bg-gray-200 font-sans">
      {/* <------- Header -------> */}
      <header className=" bg-gray-300 opacity-80  p-4 flex h-30 justify-between items-center">
        <div>
          <img src="/Barcode.png" className=" w-[200px] h-[100px]"></img>
        </div>
        <div className="p-4 -ml-28">
          <input
            className="p-4 w-[1250px] border-2 border-gray-400 rounded-3xl"
            type="text"
            placeholder="Scan The Barcode"
          ></input>
        </div>
        <div>function</div>
      </header>
      {/* <------- Header -------> */}
      {/* <------- Section ------> */}
      <section className="grid border-t-4 border-white ">
        {/* <----- Header list ----- > */}
                <section className=" h-[500px]">
          <div>
            <header className="p-4 bg-gray-300 flex justify-between">
              <h1 className="p-2">สินค้า</h1>
              <div className="flex p-2 w-60  justify-between ">
                <h1>ราคา</h1>
                <h1>จำนวน</h1>
              </div>
            </header>
            <section className=" bg-gray-100 p-2 h-[400]"> text</section>
          </div>
        </section>
          {/* <----- Header list ----- > */}
        <section className="flex p-2 h-[300] items-center mx-56 justify-center ">
          <section><ButtonUI text={"Cash"} style={"bg-yellow-500 px-20 py-6 text-xl mr-20"}/></section>
          <section><ButtonUI text={"Payment"} style={"bg-blue-500 px-20 py-6 text-xl"}/></section>
        </section>
      </section>
      {/* <------- Section ------> */}
    </main>
  );
}
