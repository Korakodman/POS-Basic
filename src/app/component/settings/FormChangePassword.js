"use client";

import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import axios from "axios";

export function FormChangePassword({user}) {
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
        return
     }
     
   axios.put(`http://localhost:3000/api/user/change-password/${user.id}`,{
    username:user.username,
    oldpassword:data.old_password,
    Newpassword:data.password,
    RepeatPassword:data.RepeatPassword
   }).then(Response=>{
    console.log(Response.data)
   }).catch(error=>{
    console.log(error)
   })
  };

  return (
    <Form className="flex w-96 flex-col gap-4 ml-4" onSubmit={onSubmit}>

       <TextField
        isRequired
        name="old_password"
        type="password"
      
      >
        <Label>Your old Password</Label>
        <Input placeholder="Password" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        name="password"
        type="password"
      
      >
        <Label>Your old Password</Label>
        <Input placeholder="Password" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
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