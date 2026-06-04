import React from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function ItemList({ item, index, onSelect, onQuantityChange, formatCurrency }) {
  const total = Number(item.price || 0) * Number(item.qty || 0);

  function handleQuantityClick(e, nextQty) {
    e.stopPropagation();
    onQuantityChange(item.ProductCode, nextQty);
  }

  return (
    <article
      className="grid cursor-pointer gap-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-lg md:grid-cols-[minmax(0,1fr)_120px_140px_120px] md:items-center"
      onClick={() => onSelect(item)}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-blue-50 text-sm font-black text-blue-700">
            {index + 1}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-base font-black text-slate-900">{item.name}</h3>
            <p className="mt-1 text-xs font-semibold text-slate-400">รหัส: {item.ProductCode}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:block md:text-right">
        <span className="text-sm font-semibold text-slate-500 md:hidden">ราคา</span>
        <span className="font-bold text-slate-700">฿{formatCurrency(item.price)}</span>
      </div>

      <div className="flex items-center justify-between md:justify-center">
        <span className="text-sm font-semibold text-slate-500 md:hidden">จำนวน</span>
        <div className="flex items-center rounded-2xl bg-slate-100 p-1">
          <button
            type="button"
            aria-label={`ลดจำนวน ${item.name}`}
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-600 transition hover:bg-white hover:text-blue-700"
            onClick={(e) => handleQuantityClick(e, item.qty - 1)}
          >
            <FiMinus aria-hidden="true" />
          </button>
          <span className="min-w-10 text-center text-lg font-black">{item.qty}</span>
          <button
            type="button"
            aria-label={`เพิ่มจำนวน ${item.name}`}
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-600 transition hover:bg-white hover:text-blue-700"
            onClick={(e) => handleQuantityClick(e, item.qty + 1)}
          >
            <FiPlus aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between md:block md:text-right">
        <span className="text-sm font-semibold text-slate-500 md:hidden">รวม</span>
        <span className="text-lg font-black text-blue-700">฿{formatCurrency(total)}</span>
      </div>
    </article>
  );
}
