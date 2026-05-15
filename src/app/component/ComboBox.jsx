import {ComboBox, Input, Label, ListBox} from "@heroui/react";

export  function ComboBoxUI({onCategoryChange}) {
     const handleCatalog = (e)=>{
  onCategoryChange(e)
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