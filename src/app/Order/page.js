"use client";
import { useEffect, useState, useRef } from "react";
import useFetchData from "../hooks/useFetchData";
import { useReactToPrint } from "react-to-print";

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const printRef = useRef();

  let { data } = useFetchData("http://localhost:3000/api/orders");

  useEffect(() => {
    if (data) {
      setOrders(data.order);
    }
  }, [data]);

  const handlePrint = useReactToPrint({
    contentRef:printRef
  });

  const handleView = (order) => {
    setSelectedOrder(order);
    setTimeout(() => handlePrint(), 100);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-300 p-6">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      <table className="w-full border bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Receipt</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">View</th>
          </tr>
        </thead>

        <tbody>
          {orders?.map((order) => (
            <tr key={order._id}>
              <td className="p-2 border">{order._id}</td>

              <td className="p-2 border">
                {new Date(order.createdAt).toLocaleString()}
              </td>

              <td className="p-2 border">{order.total}</td>

              <td className="p-2 border text-center">
                <button
                  className="text-blue-500 bg-white py-2 px-4 rounded-xl"
                  onClick={() => handleView(order)}
                >
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* RECEIPT สำหรับพิมพ์ */}
      <div style={{ position: "absolute", left: "-9999",display:"none" }}>
        <div ref={printRef} className="p-4 w-[820px] h-[400px] text-4xl  justify-center">
         <div className=" h-[200px] flex flex-col text-center" id="header">
           <h2 className="text-center font-bold">POS STORE</h2>

          <div>
            <p>Order: {selectedOrder?._id}</p>
          </div>
         <div>
           <p>
            วันที่:{" "}
            {selectedOrder &&
              new Date(selectedOrder.createdAt).toLocaleString()}
          </p>
         </div>
         <div>
          เบอร์ติดต่อ : 088-567-2###
         </div>
         <h1>-----------------------------------------------------------------</h1>
         </div>

          <hr className="my-2" />

          <table className="w-full ">
            <thead>
              <tr>
                <th align="left">สินค้า</th>
                <th>จำนวน</th>
                <th align="right">ราคา</th>
              </tr>
            </thead>

            <tbody>
              {selectedOrder?.items?.map((item,index) => (
                <tr key={item._id}>

                  <td>{index+1}.{item.name}</td>
                  <td align="center">{item.qty}</td>
                  <td align="right">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h1>-----------------------------------------------------------------</h1>
<div className="grid justify-end">

          <h3>เป็นจำนวนเงินทั้งหมด: {selectedOrder?.total}</h3>

          <p>ชำระด้วย: {selectedOrder?.OptionPayment}</p>
</div>
<h1>-----------------------------------------------------------------</h1>
        </div>
      </div>
    </div>
  );
}
