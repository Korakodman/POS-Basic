import {ComboBox, Input, Label, ListBox} from "@heroui/react";
import { useState } from "react";

export  function ComboBoxUI({data,setproducts}) {
     const handleCatalog = (e)=>{
  let word = e
  if(word){
    const result = data.filter(item=>item.category.toLowerCase().includes(word.toLowerCase()))
    setproducts(result)
  }else{
    setproducts(data)
  }
 }
  return (
     <div className="space-y-2">
      <ComboBox label="aria-label" className="w-[256px]" onInputChange={(e)=>handleCatalog(e)} >
        <ComboBox.InputGroup>
          <Input placeholder="ค้นหาประเภทสินค้า...." />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
        <ComboBox.Popover>
          <ListBox>
            <ListBox.Item textValue="ขนม">
              ขนม
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item  textValue="เครื่องดืม">
              เครื่องดืม
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item  textValue="เครื่องครัว">
           เครื่องครัว
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item textValue="อุปกรณ์การเรียน">
              อุปกรณ์การเรียน
              <ListBox.ItemIndicator />
            </ListBox.Item>
        
          </ListBox>
        </ComboBox.Popover>
      </ComboBox>
    </div>
  );
}