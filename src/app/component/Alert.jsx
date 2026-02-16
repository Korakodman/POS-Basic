import React from 'react'
import { Alert } from '@heroui/react';
export default function AlertUI() {
  return (
    <Alert status='danger' className=' absolute   w-auto bottom-10 right-10 '>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>ไม่พบรหัสที่ตรงกับสินค้า</Alert.Title>
          <Alert.Description>
            กรุณาลองใหม่อีกครั้ง
          </Alert.Description>
        </Alert.Content>
      </Alert>
  )
}
