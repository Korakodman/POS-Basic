"use client";

import { Check } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FormLogin() {
  const [msError, setmsError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const Route = useRouter();

  function Register() {
    Route.push("/register");
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
      .post("/api/Login", data)
      .then(function () {
        Route.push("/");
        Route.refresh();
      })
      .catch(function (error) {
        setmsError(error.response?.data?.message || "ไม่สามารถเข้าสู่ระบบได้");
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
        <Label className="mb-2 block text-sm font-bold text-slate-700">Username</Label>
        <Input
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
          placeholder="Enter your username"
        />
        <FieldError className="mt-1 text-sm text-red-600" />
      </TextField>

      <TextField isRequired minLength={8} name="password" type="password">
        <Label className="mb-2 block text-sm font-bold text-slate-700">Password</Label>
        <Input
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
          placeholder="Enter your password"
        />
        <FieldError className="mt-1 text-sm text-red-600" />
      </TextField>

      <Button
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-4 py-3 font-bold text-white shadow-lg shadow-cyan-600/25 transition hover:bg-cyan-700"
        type="submit"
        isDisabled={isSubmitting}
      >
        <Check />
        {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
        <span>ยังไม่มีบัญชี?</span>
        <Button
          className="bg-transparent p-0 font-bold text-cyan-700 hover:text-cyan-900"
          type="button"
          variant="secondary"
          onClick={Register}
        >
          สมัครสมาชิก
        </Button>
      </div>
    </Form>
  );
}
