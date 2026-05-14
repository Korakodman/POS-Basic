"use client";
import { useState } from "react";
import { ComboBoxUI } from "../component/ComboBox";
import { Form, Input, Label } from "@heroui/react";
import ProductsUI from "../component/ProductsUI";
import { Plus } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import useFetchData from "../hooks/useFetchData";
import { PaginationBasic } from "../component/Pagination";
const createEmptyProductForm = () => ({
  name: "",
  price: 0,
  stock: 0,
  category: "",
  image: "",
  ProductCode: "",
});

const createProductCode = () => Date.now().toString().slice(-6);

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryTerm, setCategoryTerm] = useState("");
  const [formdata, setformdata] = useState(createEmptyProductForm);

  function handleModal() {
    setformdata((prev) => ({
      ...prev,
      ProductCode: prev.ProductCode || createProductCode(),
    }));
    setIsOpen(true);
  }

  const { data, loading, error } = useFetchData(
    "http://localhost:3000/api/products",
  );
  const productSource = [...(data || []), ...addedProducts];
  const products = productSource.filter((item) => {
    const matchesName = searchTerm
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCategory = categoryTerm
      ? item.category.toLowerCase().includes(categoryTerm.toLowerCase())
      : true;

    return matchesName && matchesCategory;
  });

  function cancel() {
    setPreview(null);
  }

  async function handleForm(e) {
    const res = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formdata }),
    });
    await res.json();
    setAddedProducts((prev) => [...prev, { ...formdata, _id: formdata.ProductCode }]);
    setformdata(createEmptyProductForm());
    setIsOpen(false);
  }

  function handleInput(e) {
    const { name, value } = e.target;

    setformdata((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  }

  const [preview, setPreview] = useState(null);

  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setformdata((prev) => ({
        ...prev,
        image: reader.result, // base64 string
      }));
    };
    reader.readAsDataURL(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      cancel();
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const [page, setPage] = useState(1);
  const itemPerPage = 6;
  const totalPages = Math.ceil(products.length / itemPerPage);
  const start = (page - 1) * itemPerPage;
  const currentProducts = products.slice(start, start + itemPerPage);

  return (
    <main className=" min-h-screen w-screen  bg-gray-300 font-sans">
      <header className="h-20 p-2 flex border-4  items-center border-b-white">
        <h1 className=" text-xl mr-4 ml-4">ค้นหา</h1>
        <div className="flex justify-center items-center">
          <Input
            className="w-[250] h-9 mr-4"
            id="name"
            placeholder="ค้นหาสินค้าในคลัง"
            type="text"
            onChange={(e) => handleSearch(e)}
          />
          <ComboBoxUI onCategoryChange={setCategoryTerm} />
          <div className="ml-4 font-bold">
            <Button
              variant="secondary"
              className="font-bold"
              onClick={handleModal}
            >
              <Plus />
              เพิ่มสินค้า
            </Button>
          </div>
        </div>
      </header>
      <section className="border-4 border-b-white min-h-screen flex flex-col">
        <header className="flex justify-center py-4">
          <h1 className="text-3xl font-bold">รายการสินค้าในคลัง</h1>
        </header>

        <div className="p-6 flex-1">
          {loading ? (
            <div className="text-center text-xl">Loading...</div>
          ) : (
            <div
              className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-8
          place-items-center
        "
            >
              {currentProducts?.map((item, index) => {
                return (
                  <ProductsUI
                    key={index}
                    name={item.name}
                    price={item.price}
                    stock={item.stock}
                    category={item.category}
                    image={item.image}
                    preview={preview}
                    setPreview={setPreview}
                    _id={item._id}
                    item={item}
                    ProductCode={item.ProductCode}
                    setproducts={setAddedProducts}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="py-6 flex justify-center">
          <PaginationBasic
            itemPerPage={itemPerPage}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
          />
        </div>
      </section>
      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);

          if (!open) {
            cancel();
          }
        }}
      >
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>เพิ่มรายการหรือไม่?</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <form className="grid" onSubmit={(e) => handleForm(e)}>
                  <label htmlFor="name">ชื่อสินค้า</label>
                  <input
                    id="name"
                    className="border-2 border-gray-200 rounded-md mt-2 p-2"
                    name="name"
                    onChange={(e) => handleInput(e)}
                    required
                  />

                  <label htmlFor="price">ราคา</label>
                  <input
                    id="price"
                    className="border-2 border-gray-200 rounded-md mt-2 p-2"
                    name="price"
                    onChange={(e) => handleInput(e)}
                    required
                  />

                  <label htmlFor="stock">จำนวนที่รับ</label>
                  <input
                    id="stock"
                    className="border-2 border-gray-200 rounded-md mt-2 p-2"
                    name="stock"
                    onChange={(e) => handleInput(e)}
                    required
                  />

                  <label htmlFor="category">ประเภท</label>
                  <input
                    id="category"
                    className="border-2 border-gray-200 rounded-md mt-2 p-2"
                    name="category"
                    onChange={(e) => handleInput(e)}
                    required
                  />

                  <label htmlFor="image">รูปสินค้า</label>
                  <input
                    id="image"
                    className="border-2 border-gray-200 rounded-md mt-2 p-1"
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    required
                  />
                  <div className="flex justify-center">
                    {preview && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={preview}
                        alt="preview"
                        width={100}
                        className=" "
                      />
                    )}
                  </div>
                  <Button
                    className="w-full mt-4"
                    variant="primary"
                    type="submit"
                  >
                    เพิ่มสินค้า
                  </Button>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="w-full"
                  slot="close"
                  variant="danger"
                  onClick={cancel}
                >
                  ยกเลิก
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </main>
  );
}
