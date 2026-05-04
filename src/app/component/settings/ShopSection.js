'use client'
import SectionCard from "./SectionCard";
import { useState } from "react";

export default function ShopSection() {
  const [shop, setShop] = useState({
    name: "",
    phone: "",
    address: "",
  });

  return (
    <SectionCard title="Shop Info">
      <input
        className="input-setting"
        placeholder="Shop Name"
        onChange={(e) => setShop({ ...shop, name: e.target.value })}
      />
      <input
        className="input-setting"
        placeholder="Phone"
        onChange={(e) => setShop({ ...shop, phone: e.target.value })}
      />
      <input
        className="input-setting"
        placeholder="Address"
        onChange={(e) => setShop({ ...shop, address: e.target.value })}
      />

      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">
        Save
      </button>
    </SectionCard>
  );
}