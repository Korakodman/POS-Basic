import React from 'react'

export default function ProductsUI() {
  return (
    <div className='bg-white w-[347] p-2 mt-4 h-[200] grid grid-cols-2 rounded-2xl drop-shadow-gray-500 drop-shadow-xl '>
        <section className=' ml-2 mt-4'>
            <img src='https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/01/88/8850718807901/8850718807901_1-20240531120654-.jpg'></img>
        </section>
        <section className='grid text-lg'>
          <h1>ชื่อสินค้า :</h1>
          <h1>ราคา :</h1>
          <h1>สินค้าคงเหลือ :</h1>
          <h1>ประเภท :</h1>
        </section>
    </div>
  )
}
