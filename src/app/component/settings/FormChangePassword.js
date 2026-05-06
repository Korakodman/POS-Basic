"use client";

import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";

export function FormChangePassword() {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {}

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    
    // const keys = Object.keys(data)
    // const firstKey = keys[0];
    // const secondKey = keys[1];
    // console.log(data.password)
 if(data.password !== data.RepeatPassword){
        alert("รหัสไม่ตรงกัน")
     }
     
    alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <Form className="flex w-96 flex-col gap-4 ml-4" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="password"
        type="password"
      
      >
        <Label>Your Password</Label>
        <Input placeholder="Password" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        minLength={8}
        name="RepeatPassword"
        type="password"
      >
        <Label>Repeat Password</Label>
        <Input placeholder="Repeat your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>

      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
       
      </div>
    </Form>
  );
}