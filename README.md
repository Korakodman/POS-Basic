# POS Basic

POS Basic เป็นเว็บแอปพลิเคชันระบบขายหน้าร้านแบบพื้นฐาน พัฒนาด้วย Next.js และ MongoDB เหมาะสำหรับใช้จัดการสินค้า ทำรายการขาย ดูประวัติออเดอร์ และจัดการผู้ใช้ในร้านค้า

## Features

- **Authentication**
  - สมัครสมาชิก
  - เข้าสู่ระบบ
  - ออกจากระบบ
  - เก็บ token ผ่าน HTTP-only cookie
- **Dashboard**
  - แสดงยอดขายรวม
  - แสดงจำนวนออเดอร์
  - แสดงรายการออเดอร์ล่าสุด
  - แสดงส่วนแจ้งเตือนเบื้องต้น
- **POS**
  - เลือกสินค้าเข้าตะกร้า
  - ค้นหาสินค้าด้วย `ProductCode`
  - คำนวณยอดรวมสินค้า
  - สร้างออเดอร์จากตะกร้า
  - รองรับรูปแบบการชำระเงิน เช่น เงินสดและ QR
- **Product Management**
  - เพิ่มสินค้าใหม่
  - แสดงรายการสินค้า
  - จัดการข้อมูลสินค้า เช่น ชื่อ ราคา จำนวนคงเหลือ หมวดหมู่ รูปภาพ และรหัสสินค้า
- **Order History**
  - แสดงประวัติออเดอร์
  - ดูรายละเอียดออเดอร์
  - พิมพ์ใบเสร็จ
- **User Management**
  - แสดงรายชื่อผู้ใช้
  - แก้ไขข้อมูลผู้ใช้
- **Settings**
  - แสดงข้อมูลผู้ใช้
  - เปลี่ยนรหัสผ่าน
  - แสดงเมนูความปลอดภัยสำหรับผู้ใช้ที่มีสิทธิ์ admin

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [HeroUI](https://www.heroui.com/)
- [Axios](https://axios-http.com/)
- [JSON Web Token](https://jwt.io/)
- [bcrypt / bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [react-to-print](https://www.npmjs.com/package/react-to-print)

## Project Structure

```text
src/
  app/
    api/                 # API routes สำหรับ authentication, products, orders และ users
    component/           # UI components ที่ใช้ร่วมกันในหน้าเว็บ
    hooks/               # Custom hooks เช่น useFetchData
    lib/                 # การเชื่อมต่อฐานข้อมูล
    Models/              # Mongoose models
    POS/                 # หน้าขายสินค้า
    Products/            # หน้าจัดการสินค้า
    Order/               # หน้าประวัติออเดอร์
    User/                # หน้าจัดการผู้ใช้
    Settings/            # หน้าตั้งค่า
    login/               # หน้าเข้าสู่ระบบ
    register/            # หน้าสมัครสมาชิก
```

## Pages

| Path | Description |
| --- | --- |
| `/` | Dashboard แสดงภาพรวมยอดขายและออเดอร์ |
| `/POS` | หน้าขายสินค้าและสร้างออเดอร์ |
| `/Products` | หน้าจัดการสินค้า |
| `/Order` | หน้าประวัติออเดอร์และพิมพ์ใบเสร็จ |
| `/User` | หน้าจัดการผู้ใช้ |
| `/Settings` | หน้าตั้งค่าบัญชีและความปลอดภัย |
| `/login` | หน้าเข้าสู่ระบบ |
| `/register` | หน้าสมัครสมาชิก |

## API Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/Register` | สมัครสมาชิก |
| `POST` | `/api/Login` | เข้าสู่ระบบ |
| `GET` | `/api/Logout` | ออกจากระบบและลบ cookie |
| `GET` | `/api/me` | ตรวจสอบข้อมูลผู้ใช้จาก token |
| `GET` | `/api/products` | ดึงรายการสินค้า |
| `POST` | `/api/products` | เพิ่มสินค้า |
| `GET`, `PUT`, `DELETE` | `/api/products/[id]` | จัดการสินค้ารายตัว |
| `GET` | `/api/orders` | ดึงรายการออเดอร์ |
| `POST` | `/api/orders` | สร้างออเดอร์ |
| `GET`, `PUT`, `DELETE` | `/api/orders/[id]` | จัดการออเดอร์รายตัว |
| `GET` | `/api/admin/GetUser` | ดึงรายการผู้ใช้ |
| `GET`, `PUT`, `DELETE` | `/api/admin/GetUser/[id]` | จัดการผู้ใช้รายตัว |
| `PUT` | `/api/user/change-password/[id]` | เปลี่ยนรหัสผ่าน |

## Data Models

### User

```js
{
  username: String,
  password: String,
  role: "admin" | "cashier"
}
```

### Product

```js
{
  name: String,
  price: Number,
  stock: Number,
  category: String,
  image: String,
  ProductCode: String
}
```

### Order

```js
{
  userId: ObjectId,
  items: [
    {
      productId: ObjectId,
      name: String,
      price: Number,
      qty: Number,
      discount: Number
    }
  ],
  total: Number,
  OptionPayment: "cash" | "qr",
  status: "ชำระแล้ว" | "CANCELLED"
}
```

### Category

```js
{
  name: String
}
```

## Environment Variables

สร้างไฟล์ `.env.local` ที่ root ของโปรเจกต์ แล้วกำหนดค่า MongoDB connection string

```env
URLDATABASE=mongodb+srv://username:password@cluster-url/database-name
```

> หมายเหตุ: ห้าม commit ค่า connection string จริงขึ้น repository

## Getting Started

ติดตั้ง dependencies

```bash
npm install
```

รัน development server

```bash
npm run dev
```

เปิดเว็บที่

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

รันโปรเจกต์ในโหมด development

```bash
npm run build
```

build โปรเจกต์สำหรับ production

```bash
npm run start
```

รัน production server หลังจาก build แล้ว

```bash
npm run lint
```

ตรวจสอบโค้ดด้วย ESLint

## Authentication Flow

1. ผู้ใช้เข้าสู่ระบบผ่าน `/api/Login`
2. ระบบตรวจสอบ `username` และ `password`
3. ถ้าข้อมูลถูกต้อง ระบบจะสร้าง JWT token และเก็บไว้ใน cookie ชื่อ `token`
4. `middleware.js` จะตรวจสอบ cookie ก่อนเข้าใช้งานหน้าที่ต้อง login
5. ถ้ายังไม่มี token ระบบจะ redirect ไปที่ `/login`
6. ถ้ามี token แล้ว ผู้ใช้จะไม่สามารถกลับไปหน้า `/login` หรือ `/register` ได้โดยตรง

## Notes

- ระบบใช้ MongoDB ผ่าน Mongoose
- ต้องตั้งค่า `URLDATABASE` ก่อนเริ่มใช้งาน
- หลายหน้าของโปรเจกต์เรียก API ผ่าน `http://localhost:3000/api/...`
- โปรเจกต์นี้เหมาะสำหรับใช้เป็น POS พื้นฐาน หรือใช้ต่อยอดเป็นระบบขายหน้าร้านจริง
