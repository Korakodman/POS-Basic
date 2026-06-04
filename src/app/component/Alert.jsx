import React from "react";
import { Alert } from "@heroui/react";

export default function AlertUI() {
  return (
    <Alert status="danger" className="fixed bottom-6 right-6 z-50 w-auto max-w-sm rounded-2xl shadow-2xl">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>ไม่พบรหัสที่ตรงกับสินค้า</Alert.Title>
        <Alert.Description>ตรวจสอบบาร์โค้ดแล้วลองสแกนใหม่อีกครั้ง</Alert.Description>
      </Alert.Content>
    </Alert>
  );
}
