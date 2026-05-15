"use client";

import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FormRegis() {
  const [msError, setmsError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Route = useRouter();

  function login() {
    Route.push("/login");
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setmsError("");

    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    axios
      .post("/api/Register", data)
      .then(function () {
        Route.push("/login");
      })
      .catch(function (error) {
        setmsError(error.response?.data?.message || "ไม่สามารถสมัครสมาชิกได้");
      })
      .finally(function () {
        setIsSubmitting(false);
      });
  };

  return (
    <Form className="flex flex-col gap-5" onSubmit={onSubmit} validationBehavior="aria">
      {msError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {msError}
        </div>
      )}

      <TextField isRequired name="username" type="text">
        <Label className="mb-2 block text-sm font-bold text-slate-700">ชื่อผู้ใช้งาน</Label>
        <Input
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
          placeholder="Create your username"
        />
        <FieldError className="mt-1 text-sm text-red-600" />
      </TextField>

      <TextField isRequired minLength={8} name="password" type="password">
        <Label className="mb-2 block text-sm font-bold text-slate-700">รหัสผ่าน</Label>
        <Input
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
          placeholder="Enter your password"
        />
        <Description className="mt-1 text-xs text-slate-500">
          อย่างน้อย 8 ตัวอักษร แนะนำให้มีตัวพิมพ์ใหญ่และตัวเลข
        </Description>
        <FieldError className="mt-1 text-sm text-red-600" />
      </TextField>

      <TextField isRequired minLength={8} name="repeatPassword" type="password">
        <Label className="mb-2 block text-sm font-bold text-slate-700">ยืนยันรหัสผ่าน</Label>
        <Input
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
          placeholder="Repeat your password"
        />
        <FieldError className="mt-1 text-sm text-red-600" />
      </TextField>

      <Button
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 px-4 py-3 font-bold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700"
        type="submit"
        isDisabled={isSubmitting}
      >
        <Check />
        {isSubmitting ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
        <span>มีบัญชีอยู่แล้ว?</span>
        <Button
          className="bg-transparent p-0 font-bold text-teal-700 hover:text-teal-900"
          type="button"
          variant="secondary"
          onClick={login}
        >
          เข้าสู่ระบบ
        </Button>
      </div>
    </Form>
  );
}
