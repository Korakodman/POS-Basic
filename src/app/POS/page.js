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
            <header className="p-4 bg-gray-300 flex justify-between font-bold">
              <h1 className="p-2 ">สินค้า</h1>
              <div className="flex p-2 w-60  justify-between ">
                <h1>ราคา</h1>
                <h1>จำนวน</h1>
              </div>
            </header>
            <section className=" bg-gray-100 p-2 h-[400]">
              <div className="p-2 flex justify-between">
                <h1>pencil</h1>
                <div className="flex w-60 p-2 justify-between">
                  <h1>20</h1>
                  <h1>2</h1>
                </div>
              </div>
               <div className="p-2 flex justify-between">
                <h1>เลย์</h1>
                <div className="flex w-60 p-2 justify-between">
                  <h1>22</h1>
                  <h1>2</h1>
                </div>
              </div>
               <div className="p-2 flex justify-between">
                <h1>text</h1>
                <div className="flex w-60 p-2 justify-between">
                  <h1>210</h1>
                  <h1>2</h1>
                </div>
              </div>
            </section>
          </div>
          <section className=" flex justify-between font-bold bg-amber-200 h-20 items-center">
            <div>
              <h1 className="p-2 "> รวม</h1>
            </div>
            <div className="flex p-2 justify-between w-60">
              <h1>{252} บาท</h1>
              <h1>{3} รายการ </h1>
              <h1>{6} ชิ้น</h1>
            </div>
          </section>
        </section>
        {/* <----- Header list ----- > */}
        <section className="flex p-2 h-[300] items-center mx-56 justify-center ">
          <section>
            <ButtonUI
              text={"Cash"}
              style={"bg-yellow-500 px-20 py-6 text-xl mr-20"}
            />
          </section>
          <section>
            <ButtonUI
              text={"Payment"}
              style={"bg-blue-500 px-20 py-6 text-xl"}
            />
          </section>
        </section>
      </section>
      {/* <------- Section ------> */}
    </main>
  );
}
