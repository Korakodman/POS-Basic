'use client'
import{ useEffect, useState } from 'react'
import { ComboBoxUI } from '../component/ComboBox'
import {Form, Input, Label} from "@heroui/react";
import ProductsUI from '../component/ProductsUI';
import {Plus} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";
import { useFormState } from 'react-dom';
export default function page() {
 const [isOpen, setIsOpen] = useState(false);
   function handleModal() {
    setIsOpen(true);
  }


  
const [products,setproducts] = useState([])
const [formdata,setformdata] = useState({
  name : "",
  price: Number(0),
  stock :Number(0),
  category : "",
  image : "",
})
useEffect(()=>{
     console.log(products)
  },[products])
//  let itemMock = [{
//   image:"https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/01/88/8850718807901/8850718807901_1-20240531120654-.jpg",
//     name:"เลย์แผ่นเรียบ",
//     price:22,
//     stock:20,
//     catalog:"ขนมทานเล่น"
    
//    },
//   {
//     image :"https://o2o-static.lotuss.com/products/86593/72548045.jpg",
//     name:"เลย์บาร์บีคิว",
//     price:22,
//     stock:10,
//     catalog:"ขนมทานเล่น"
    
//    },
//   {
//     image:"https://gg.lnwfile.com/g2y3jl.webp",
//     name:"เลย์รสหมึกย่าง",
//     price:22,
//     stock:11,
//     catalog:"ขนมทานเล่น"
    
//    },
//   {
//      image:"https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/55/88/8850718711055/8850718711055_2-20240610175920-.jpg",
//     name:"เลย์รสไข่เค็ม",
//     price:22,
//     quantity:20,
//     catalog:"ขนมทานเล่น"
    
//    }]


   function handleForm(params) {
    setproducts(prev => [
    ...prev,
    { ...formdata }
  ]);
 setformdata({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    image: ""
  });
setIsOpen(false)
   }

   function handleInput(e) {
    const {name,value} = e.target
  
  setformdata(prev => ({
    ...prev,
    [name]: value
  }));
   }

  return (  
    <main className=' min-h-screen w-screen  bg-gray-300 font-sans'>
      <header className='h-20 p-2 flex border-4  items-center border-b-white'>
        <h1 className=' text-xl mr-4 ml-4'>ค้นหา</h1>
        <div className='flex justify-center items-center'>
            <Input className="w-[250] h-9 mr-4" id="name" placeholder="ค้นหาสินค้าในคลัง" type="text" />
           <ComboBoxUI/>
        <div className='ml-4 font-bold'>
        <Button variant="secondary" className="font-bold" onClick={handleModal}>
        <Plus />
        เพิ่มสินค้า
      </Button>
        </div>
        </div>
        </header>
      <section className='border-4 border-b-white h-[800]'>
        <header className='flex justify-center '>
          <h1 className='text-2xl mt-2 '>รายการสินค้าในคลัง</h1>
        </header>
         <div className='p-4 grid grid-cols-3 place-items-center'>
       {products.map((item,index)=>{
        return(
           <ProductsUI key={index} name={item.name} price={item.price} stock={item.stock} category={item.category} image={item.image}/>
        )
       })}

        </div>
        </section>
         <Modal  isOpen={isOpen} onOpenChange={setIsOpen}>
                      <Modal.Backdrop>
                        <Modal.Container>
                          <Modal.Dialog className="sm:max-w-[360px]">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                              <Modal.Heading>เพิ่มรายการหรือไม่?</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                            <form className='grid'>
                              <label >ชื่อสินค้า</label>
                              <input className='border-2 border-gray-200 rounded-md mt-2 p-2' name='name' onChange={(e)=>handleInput(e)}></input>
                                <label>ราคา</label>
                              <input className='border-2 border-gray-200 rounded-md mt-2 p-2' name="price" onChange={(e)=>handleInput(e)}></input>
                                <label>จำนวนที่รับ</label>
                              <input className='border-2 border-gray-200 rounded-md mt-2 p-2' name="stock" onChange={(e)=>handleInput(e)}></input>
                              <label>ประเภท</label>
                              <input className='border-2 border-gray-200 rounded-md mt-2 p-2 ' name="category" onChange={(e)=>handleInput(e)}></input>
                              <label>รูปสินค้า</label>
                              <input className='border-2 border-gray-200 rounded-md mt-2 p-1' type='file' name="image" onChange={(e)=>handleInput(e)}></input>
                            </form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button className="w-full"  variant='primary' onClick={handleForm} >
                               เพิ่มสินค้า
                              </Button>
                              <Button className="w-full" slot='close' variant='danger' >
                               ยกเลิก
                              </Button>
                            </Modal.Footer>
                          </Modal.Dialog>
                        </Modal.Container>
                      </Modal.Backdrop>
                    </Modal>
    </main>
  )
}
