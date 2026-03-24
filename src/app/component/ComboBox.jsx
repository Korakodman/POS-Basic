import {ComboBox, Input, Label, ListBox} from "@heroui/react";
import { useState } from "react";

export function ComboBoxUI({catalog}) {
    const [inputValue, setInputValue] = useState("");
  return (
     <div className="space-y-2">
      <ComboBox className="w-[256px]" inputValue={inputValue} onInputChange={setInputValue}>
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