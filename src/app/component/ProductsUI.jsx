"use client"
import React,{useState} from "react";
import {Button, Modal} from "@heroui/react";
export default function ProductsUI({name,price,stock,category,image,preview}) {
 const [isOpen, setIsOpen] = useState(false);

     function handleModal() {
    setIsOpen(true);
  }
  const openModal = ({name}) =>{
  handleModal()
  }
  function handleInput (e) {
    const {name ,value } = e.target
    console.log(value)
  }

  return (
    <div onClick={()=>openModal({name})} className="flex border-2  w-[400] h-[200] justify-around items-center bg-white p-2 rounded-xl mt-10 drop-shadow-gray-500 drop-shadow-2xl" >
      <section className="w-[175] " >
        <img src={image} alt="preview"></img>
      </section>
      <section className=" p-2">
        <div className="font-bold">ชื่อสินค้า : {name}</div>
        <div className="mt-4">ราคา : {price}</div>
        <div className="mt-4">จำนวนในคลัง : {stock}</div>
         <div className="mt-4">ประเภท : {category}</div>
      </section>
       <Modal  isOpen={isOpen} onOpenChange={setIsOpen}>
              <Modal.Backdrop>
                <Modal.Container>
                  <Modal.Dialog className="sm:max-w-[360px]">
                    <Modal.CloseTrigger />
                    <Modal.Header>
                      <Modal.Heading>แก้ไขรายการหรือไม่?</Modal.Heading>
                    </Modal.Header>
                    <Modal.Body>
                     <form className="grid" onSubmit={(e)=>handleForm(e)}>
                  <label aria-label="text">ชื่อสินค้า</label>
                  <input
                    className="border-2 border-gray-200 rounded-md mt-2 p-2"
                    name="name"
                    onChange={(e) => handleInput(e)}
                    required
                    value={name}
                  ></input>
                  <label aria-label="text" >ราคา</label>
                  <input
                    className="border-2 border-gray-200 rounded-md mt-2 p-2"
                    name="price"
                    onChange={(e) => handleInput(e)}
                    required
                    value={price}
                  ></input>
                  <label aria-label="text">จำนวนที่รับ</label>
                  <input
                    className="border-2 border-gray-200 rounded-md mt-2 p-2"
                    name="stock"
                    onChange={(e) => handleInput(e)}
                    required
                    value={stock}
                  ></input>
                  <label aria-label="text">ประเภท</label>
                  <input
                    className="border-2 border-gray-200 rounded-md mt-2 p-2 "
                    name="category"
                    onChange={(e) => handleInput(e)}
                    required
                    value={category}
                  ></input>
                  <label aria-label="text">รูปสินค้า</label>
                  <input
                    className="border-2 border-gray-200 rounded-md mt-2 p-1"
                    type="file"
                    name="image"
                    
                    required
                  ></input>
                  <div className="flex justify-center">
                    {image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={image}
                        alt="preview"
                        width={100}
                        className=" "
                      />
                    )}
                  </div>
                  <Button className="w-full mt-4" variant="primary" type="submit">
                    ยืนยันแก้ไข
                  </Button>
                </form>
                    </Modal.Body>
                    <Modal.Footer>
                    
                      <Button className="w-full" slot="close" variant='danger' >
                        ยกเลิก
                      </Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
    </div>
    
  );
}
