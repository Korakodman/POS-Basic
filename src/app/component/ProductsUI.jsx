"use client";
import React, { useState } from "react";
import { Button, Modal,Card ,Chip ,Input,} from "@heroui/react";
import {Package,Boxes,Tag,Barcode,ImagePlus,Pencil,} from "lucide-react";

export default function ProductsUI({
  name,
  price,
  stock,
  category,
  image,
  preview,
  setPreview,
  _id,
  item,
  setproducts,
  ProductCode
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [SelectProduct, setSelectProduct] = useState({});

  function handleModal() {
    setIsOpen(true);
  }
  const openModal = ({ name, price, stock, category, image, _id, ProductCode }) => {
    handleModal();
    setSelectProduct({
      name: name,
      price: price,
      stock: stock,
      category: category,
      image: image,
      _id: _id,
      ProductCode: ProductCode
      
    });
  };
  function handleInput(e) {
    const { name, value } = e.target;
    setSelectProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function handleForm() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/${SelectProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(SelectProduct),
        },
      );
    } catch (error) {
      console.log("Something Error ", error);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectProduct((prev) => ({
          ...prev,
          image: reader.result, 
        }));
      };
      reader.readAsDataURL(file);
      if (file) {
        setPreview(URL.createObjectURL(file));
      } else {
        cancel();
      }
    }
  }
  return (
    <>
      <Card
  onClick={() =>
    openModal({ name, price, stock, category, image, _id, ProductCode })
  }
  className="
    w-[350px]
    rounded-3xl
    p-3
    bg-white
    hover:scale-[1.02]
    transition-all
    duration-300
    shadow-md
    hover:shadow-2xl
  "
>

  {/* Product Image */}
  <Card className="overflow-visible p-0">
    <div className="flex justify-center">

    <div className="w-[220px] h-[220px] overflow-hidden rounded-2xl bg-gray-100">

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={name}
        className="
          w-full
          h-full
          object-cover
          hover:scale-105
          transition-all
          duration-500
        "
      />

    </div>

  </div>


  </Card>

  {/* Product Info */}
  <Card.Footer className="flex flex-col items-start gap-3 pt-5">

    <div className="flex justify-between items-center w-full">

      <h1 className="text-xl font-bold">
        {name}
      </h1>

      <Chip color="primary" variant="flat">
        {category}
      </Chip>

    </div>

    <div className="grid gap-2 text-sm text-gray-600 w-full">

      <div className="flex items-center gap-2">
        <Tag size={16} />
        <span>ราคา : {price} บาท</span>
      </div>

      <div className="flex items-center gap-2">
        <Boxes size={16} />
        <span>คงเหลือ : {stock}</span>
      </div>

      <div className="flex items-center gap-2">
        <Barcode size={16} />
        <span>{ProductCode}</span>
      </div>

    </div>

  </Card.Footer>
</Card>
<Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>แก้ไขรายการหรือไม่</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <form className="grid" onSubmit={(e) => handleForm(e)}>
                  <label htmlFor="text">ชื่อสินค้า</label>
                  <input
                    className="border-2 border-gray-200 rounded-md mt-2 p-2"
                    name="name"
                    onChange={(e) => handleInput(e)}
                    required
                    value={SelectProduct.name}
                  ></input>
                  <label htmlFor="text">ราคา</label>
                  <input
                    className="border-2 border-gray-200 rounded-md mt-2 p-2"
                    name="price"
                    onChange={(e) => handleInput(e)}
                    required
                    value={SelectProduct.price}
                  ></input>
                  <label htmlFor="text">จำนวนที่รับ</label>
                  <input
                    className="border-2 border-gray-200 rounded-md mt-2 p-2"
                    name="stock"
                    onChange={(e) => handleInput(e)}
                    required
                    value={SelectProduct.stock}
                  ></input>
                  <label htmlFor="text">ประเภท</label>
                  <input
                    className="border-2 border-gray-200 rounded-md mt-2 p-2 "
                    name="category"
                    onChange={(e) => handleInput(e)}
                    required
                    value={SelectProduct.category}
                  ></input>
                  <label htmlFor="text">รูปสินค้า</label>
                  <input
                    className="border-2 border-gray-200 rounded-md mt-2 p-1"
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                  ></input>
                  <div className="flex justify-center">
                    {image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={SelectProduct.image || image}
                        alt="preview"
                        width={100}
                        className=" "
                      />
                    )}
                  </div>
                  <div>
                    <label>
                      Barcode : {SelectProduct.ProductCode}
                    </label>
                  </div>
                  <Button
                    className="w-full mt-4"
                    variant="primary"
                    type="submit"
                  >
                    ยืนยันแก้ไข
                  </Button>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button className="w-full" slot="close" variant="danger">
                  ยกเลิก
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
  </>);
}
